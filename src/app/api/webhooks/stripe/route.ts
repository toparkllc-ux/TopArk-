import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/service";

/**
 * Stripe webhook handler.
 *
 * Stripe calls this endpoint whenever a subscription event happens.
 * We verify the signature (proves it's really from Stripe, not a fake request),
 * then update the user's membership_tier in Supabase to match what they paid for.
 *
 * Flow:
 * 1. User clicks "Upgrade" → /api/checkout creates a Stripe Checkout session
 * 2. User pays on Stripe's hosted page
 * 3. Stripe fires checkout.session.completed → we mark them Elite or Pro Ark
 * 4. If they cancel later → customer.subscription.deleted → back to free
 */

// Map Stripe Price IDs → our internal tier names
function tierFromPriceId(priceId: string): "elite" | "pro_ark" | null {
  const map: Record<string, "elite" | "pro_ark"> = {
    [process.env.STRIPE_PRICE_ELITE_MONTHLY ?? ""]: "elite",
    [process.env.STRIPE_PRICE_ELITE_YEARLY ?? ""]: "elite",
    [process.env.STRIPE_PRICE_PRO_ARK_MONTHLY ?? ""]: "pro_ark",
    [process.env.STRIPE_PRICE_PRO_ARK_YEARLY ?? ""]: "pro_ark",
  };
  return map[priceId] ?? null;
}

async function setUserTier(
  userId: string,
  tier: "free" | "elite" | "pro_ark",
  stripeCustomerId?: string,
  stripeSubscriptionId?: string
) {
  const supabase = createServiceClient();
  const update: Record<string, unknown> = { membership_tier: tier, updated_at: new Date().toISOString() };
  if (stripeCustomerId) update.stripe_customer_id = stripeCustomerId;
  if (stripeSubscriptionId) update.stripe_subscription_id = stripeSubscriptionId;

  const { error } = await supabase
    .from("athlete_profiles")
    .update(update)
    .eq("id", userId);

  if (error) {
    console.error(`[stripe-webhook] Failed to set tier for user ${userId}:`, error);
    throw error;
  }
  console.log(`[stripe-webhook] User ${userId} → ${tier}`);
}

// Find our user ID from a Stripe customer ID
async function userIdFromCustomerId(customerId: string): Promise<string | null> {
  const supabase = createServiceClient();
  const { data } = await supabase
    .from("athlete_profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();
  return data?.id ?? null;
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Invalid signature:", err);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      /**
       * checkout.session.completed fires right after a user successfully pays.
       * We stored user_id in the session's metadata when creating it (/api/checkout).
       */
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.user_id ?? session.client_reference_id;
        const customerId = typeof session.customer === "string" ? session.customer : null;
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : null;

        if (!userId) {
          console.error("[stripe-webhook] checkout.session.completed: no user_id in metadata");
          break;
        }

        // Get the price ID from the line items to determine tier
        const stripe = getStripe();
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { limit: 1 });
        const priceId = lineItems.data[0]?.price?.id ?? "";
        const tier = tierFromPriceId(priceId);

        if (!tier) {
          console.error(`[stripe-webhook] Unknown price ID: ${priceId}`);
          break;
        }

        await setUserTier(userId, tier, customerId ?? undefined, subscriptionId ?? undefined);
        break;
      }

      /**
       * subscription.updated fires when a subscription changes —
       * plan upgrade/downgrade, renewal, payment failure recovery, etc.
       */
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === "string" ? sub.customer : null;
        if (!customerId) break;

        const userId = await userIdFromCustomerId(customerId);
        if (!userId) break;

        // Active or trialing = they still have access; anything else = downgrade to free
        const active = sub.status === "active" || sub.status === "trialing";
        if (!active) {
          await setUserTier(userId, "free");
          break;
        }

        const priceId = sub.items.data[0]?.price?.id ?? "";
        const tier = tierFromPriceId(priceId);
        if (tier) await setUserTier(userId, tier, customerId, sub.id);
        break;
      }

      /**
       * subscription.deleted fires when a subscription is cancelled and
       * the billing period ends. Move the user back to free.
       */
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const customerId = typeof sub.customer === "string" ? sub.customer : null;
        if (!customerId) break;

        const userId = await userIdFromCustomerId(customerId);
        if (!userId) break;

        await setUserTier(userId, "free");
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("[stripe-webhook] Handler error:", err);
    // Return 500 so Stripe retries the event
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
