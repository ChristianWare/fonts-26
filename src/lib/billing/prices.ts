// src/lib/billing/prices.ts
export type Plan =
  | "SOLO"
  | "TEAM"
  | "RENTAL_FLEET"
  | "MULTI_LOCATION"
  | "CUSTOM";

export function planToPriceId(plan: Plan): string {
  switch (plan) {
    case "SOLO":
      return process.env.STRIPE_PRICE_SOLO!;
    case "TEAM":
      return process.env.STRIPE_PRICE_TEAM!;
    case "RENTAL_FLEET":
      return process.env.STRIPE_PRICE_RENTAL_FLEET!;
    case "MULTI_LOCATION":
      return process.env.STRIPE_PRICE_MULTI_LOCATION!;
    case "CUSTOM":
      throw new Error("Custom is quote-only; no direct Checkout");
  }
}
export function setupFeePriceId(): string {
  return process.env.STRIPE_SETUP_FEE_PRICE!;
}
