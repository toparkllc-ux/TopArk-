import { NextRequest, NextResponse } from "next/server";
import { getStripe, priceIdFor, type BillingInterval, type PlanId } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Payments are not configured yet." }, { status: 503 });
  }

  let body: { plan?: PlanId; interval?: BillingInterval };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.plan !== "elite" && body.plan !== "pro_ark") {
    return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
  }
  if (body.interval !== "monthly" && body.interval !== "yearly") {
    return NextResponse.json({ error: "Invalid billing interval." }, { status: 400 });
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "You must be signed in to upgrade." }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: user.email,
      client_reference_id: user.id,
      line_items: [{ price: priceIdFor(body.plan, body.interval), quantity: 1 }],
      success_url: `${siteUrl}/dashboard/membership?checkout=success`,
      cancel_url: `${siteUrl}/dashboard/membership?checkout=cancelled`,
      metadata: { user_id: user.id, plan: body.plan, interval: body.interval },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "Unable to start checkout." }, { status: 502 });
  }
}
