/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/stripe/webhook/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

function toDateOrNull(ts?: number | null) {
  return ts ? new Date(ts * 1000) : null;
}

function coerceStatus(s: string): any {
  // Your enum might not include all Stripe statuses; coerce if needed.
  const allowed = new Set([
    "active",
    "trialing",
    "past_due",
    "canceled",
    "unpaid",
    "incomplete",
    "incomplete_expired",
    "paused",
  ]);
  return allowed.has(s) ? (s as any) : ("active" as any);
}

async function upsertFromSubscriptionObject(
  sub: Stripe.Subscription,
  explicitUserId?: string
) {
  const customerId = sub.customer as string;

  let user = await db.user.findUnique({
    where: { stripeCustomerId: customerId },
  });
  if (!user && explicitUserId) {
    user = await db.user.findUnique({ where: { id: explicitUserId } });
    if (user && !user.stripeCustomerId) {
      await db.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }
  }
  if (!user) return;

  const item = sub.items.data[0];
  const price = item?.price || null;

  const unitAmount = price?.unit_amount ?? null;
  const currency = (price?.currency ?? "usd").toUpperCase();
  const planTier =
    (sub.metadata?.planTier as string | undefined) ??
    (price?.nickname as string | undefined) ??
    null;

  const trialEnd = (sub as any).trial_end as number | undefined;
  const cpe = (sub as any).current_period_end as number | undefined;
  const nextAt = trialEnd ?? cpe ?? null;

  await db.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      stripeSubscriptionId: sub.id,
      stripePriceId: price?.id ?? "",
      userId: user.id,
      planTier: (planTier as any) ?? "SOLO",
      status: coerceStatus(sub.status),
      unitAmount: unitAmount ?? 0,
      currency,
      currentPeriodEnd: toDateOrNull(nextAt),
      // if you added trialEnd and priceNickname columns, set them:
      // @ts-ignore
      trialEnd: toDateOrNull(trialEnd ?? null),
      // @ts-ignore
      priceNickname: price?.nickname ?? null,
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
      setupFeePaidAt: null,
      meta: {},
    },
    update: {
      stripePriceId: price?.id ?? "",
      planTier: (planTier as any) ?? undefined,
      status: coerceStatus(sub.status),
      unitAmount: unitAmount ?? undefined,
      currency,
      currentPeriodEnd: toDateOrNull(nextAt),
      // @ts-ignore
      trialEnd: toDateOrNull(trialEnd ?? null),
      // @ts-ignore
      priceNickname: price?.nickname ?? null,
      cancelAtPeriodEnd: sub.cancel_at_period_end ?? false,
      updatedAt: new Date(),
    },
  });
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  if (!sig) return new NextResponse("Missing signature", { status: 400 });

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret)
    return new NextResponse("Missing webhook secret", { status: 500 });

  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig, secret);
  } catch (err) {
    console.error("Invalid webhook signature:", err);
    return new NextResponse("Invalid signature", { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const customerId = session.customer as string | null;

        // Link the customer to the user
        let userId =
          (session.metadata?.userId as string | undefined) ?? undefined;
        if (!userId && session.customer_details?.email) {
          const u = await db.user.findUnique({
            where: { email: session.customer_details.email },
          });
          if (u) userId = u.id;
        }
        if (customerId && userId) {
          await db.user.update({
            where: { id: userId },
            data: { stripeCustomerId: customerId },
          });
        }

        // Optional immediate upsert to avoid waiting for subscription.created arrival
        const subId = session.subscription as string | null;
        if (subId) {
          const sub = await stripe.subscriptions.retrieve(subId, {
            expand: ["items.data.price"],
          });
          await upsertFromSubscriptionObject(sub, userId);
        }
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        // Ensure price expanded so unit_amount/nickname are present
        const full = await stripe.subscriptions.retrieve(sub.id, {
          expand: ["items.data.price"],
        });
        await upsertFromSubscriptionObject(
          full,
          sub.metadata?.userId as string | undefined
        );
        break;
      }

      case "invoice.paid": {
        const base = event.data.object as Stripe.Invoice;
        if (!base.id) break;

        const inv = await stripe.invoices.retrieve(base.id, {
          expand: ["lines.data.price"],
        });

        const customerId = inv.customer as string | null;
        const setupPriceId = process.env.STRIPE_SETUP_FEE_PRICE;

        if (customerId && setupPriceId) {
          const user = await db.user.findUnique({
            where: { stripeCustomerId: customerId },
          });
          if (user) {
            const hasSetup = inv.lines.data.some(
              (l: any) => l.price?.id === setupPriceId
            );
            if (hasSetup) {
              await db.subscription.updateMany({
                where: { userId: user.id, setupFeePaidAt: null },
                data: { setupFeePaidAt: new Date() },
              });
            }
          }
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return new NextResponse("Webhook processing error", { status: 500 });
  }
}
