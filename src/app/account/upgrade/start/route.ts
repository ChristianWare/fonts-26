// app/account/upgrade/start/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";
import { planToPriceId, setupFeePriceId, Plan } from "@/lib/billing/prices";
import { firstCompliantAnchorPhoenixUnix } from "@/lib/dates";

export const runtime = "nodejs";

// --- Env sanity checks ----
const RAW_STRIPE_KEY = process.env.STRIPE_SECRET_KEY;
if (!RAW_STRIPE_KEY) throw new Error("Missing STRIPE_SECRET_KEY");
if (!RAW_STRIPE_KEY.startsWith("sk_")) {
  throw new Error("STRIPE_SECRET_KEY must start with 'sk_'");
}

const stripe = new Stripe(RAW_STRIPE_KEY, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return new NextResponse("Unauthorized", { status: 401 });

  try {
    const form = await req.formData();
    const plan = form.get("plan") as Plan | null;
    if (!plan) return new NextResponse("Missing plan", { status: 400 });

    // Load user
    const user =
      (session.user?.id &&
        (await db.user.findUnique({ where: { id: session.user.id } }))) ||
      (session.user?.email &&
        (await db.user.findUnique({ where: { email: session.user.email! } })));

    if (!user) return new NextResponse("User not found", { status: 404 });

    // Ensure Stripe customer
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id },
      });
      customerId = customer.id;
      await db.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    // Compute anchor (1st of next month in Phoenix, or following month if <48h away)
    const trialEnd = firstCompliantAnchorPhoenixUnix();

    // Prices from env (one-time setup + recurring monthly)
    const setupPrice = setupFeePriceId(); // must be a real one-time Stripe Price ID
    const planPrice = planToPriceId(plan); // must be a real recurring monthly Price ID

    // Optional: verify the recurring price really is recurring to avoid misconfig
    const planPriceObj = await stripe.prices.retrieve(planPrice);
    if (planPriceObj.type !== "recurring") {
      return new NextResponse("Configured plan price is not recurring", {
        status: 400,
      });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        { price: setupPrice, quantity: 1 },
        { price: planPrice, quantity: 1 },
      ],
      metadata: { userId: user.id },
      subscription_data: {
        trial_end: trialEnd, 
        metadata: {
          userId: user.id,
          planTier: plan,
        },
      },
      allow_promotion_codes: true,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/account/upgrade?plan=${plan}`,
    });

    // Important: force GET on redirect to Stripe (CloudFront rejects POST)
    return NextResponse.redirect(checkout.url!, { status: 303 });
  } catch (err) {
    console.error("Stripe error creating Checkout Session:", err);
    return new NextResponse(
      "Billing is temporarily unavailable. Please try again.",
      { status: 500 }
    );
  }
}
