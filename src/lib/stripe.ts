import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set.");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export type PlanId = "elite" | "pro_ark";
export type BillingInterval = "monthly" | "yearly";

export function priceIdFor(plan: PlanId, interval: BillingInterval): string {
  const key =
    plan === "elite"
      ? interval === "monthly"
        ? "STRIPE_PRICE_ELITE_MONTHLY"
        : "STRIPE_PRICE_ELITE_YEARLY"
      : interval === "monthly"
        ? "STRIPE_PRICE_PRO_ARK_MONTHLY"
        : "STRIPE_PRICE_PRO_ARK_YEARLY";
  const priceId = process.env[key];
  if (!priceId) {
    throw new Error(`${key} is not set.`);
  }
  return priceId;
}
