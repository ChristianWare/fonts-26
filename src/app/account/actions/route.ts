/* eslint-disable @typescript-eslint/no-explicit-any */
// app/account/actions/route.ts
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { db } from "@/lib/db";
import Stripe from "stripe";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

type Plan = "SOLO" | "TEAM" | "RENTAL_FLEET" | "MULTI_LOCATION" | "CUSTOM";

function planToPriceId(plan: Plan): string {
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
      return process.env.STRIPE_PRICE_CUSTOM!;
  }
}

/** normalize snake_case/camelCase reads */
function readSubField<T = unknown>(
  obj: unknown,
  snake: string,
  camel: string
): T | undefined {
  const o = obj as any;
  return (o?.[snake] ?? o?.[camel]) as T | undefined;
}

function mapStripeToDbFields(sub: Stripe.Subscription) {
  const s: any = sub as any;
  const item0 = s?.items?.data?.[0] ?? null;
  const price = item0?.price ?? null;

  const unitAmount =
    readSubField<number>(price, "unit_amount", "unitAmount") ?? 0;
  const currency = (
    (price?.currency as string | undefined) ?? "usd"
  ).toUpperCase();
  const currentPeriodEndUnix =
    readSubField<number>(s, "current_period_end", "currentPeriodEnd") ?? null;
  const cancelAtPeriodEnd =
    readSubField<boolean>(s, "cancel_at_period_end", "cancelAtPeriodEnd") ??
    false;

  return {
    stripeSubscriptionId: s.id as string,
    stripePriceId: price?.id ?? "",
    status: s.status as any,
    unitAmount,
    currency,
    currentPeriodEnd: currentPeriodEndUnix
      ? new Date(currentPeriodEndUnix * 1000)
      : null,
    cancelAtPeriodEnd,
  };
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // identify the current user
  const where = session.user?.id
    ? { id: session.user.id }
    : session.user?.email
      ? { email: session.user.email }
      : null;

  if (!where) return NextResponse.redirect(new URL("/login", req.url));

  const user = await db.user.findUnique({
    where,
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  if (!user) return NextResponse.redirect(new URL("/login", req.url));

  const form = await req.formData();
  const action = String(form.get("action") || "");

  try {
    switch (action) {
      case "change_plan": {
        const plan = String(form.get("plan") || "") as Plan;
        if (!plan) return new NextResponse("Missing plan", { status: 400 });
        if (!user.stripeCustomerId) {
          return new NextResponse("No Stripe customer", { status: 400 });
        }

        const current =
          user.subscriptions?.[0] ??
          (await db.subscription.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
          }));

        let stripeSubId = current?.stripeSubscriptionId ?? null;
        if (!stripeSubId) {
          const list = await stripe.subscriptions.list({
            customer: user.stripeCustomerId,
            status: "all",
            limit: 1,
          });
          stripeSubId = list.data[0]?.id ?? null;
        }
        if (!stripeSubId) {
          return new NextResponse("No Stripe subscription to update", {
            status: 400,
          });
        }

        const newPrice = planToPriceId(plan);

        const sub = (await stripe.subscriptions.retrieve(stripeSubId, {
          expand: ["items.data.price"],
        })) as unknown as Stripe.Subscription;

        const itemId = (sub as any)?.items?.data?.[0]?.id ?? null;
        if (!itemId) {
          return new NextResponse("No subscription item found", {
            status: 400,
          });
        }

        await stripe.subscriptions.update(stripeSubId, {
          items: [{ id: itemId, price: newPrice }],
          proration_behavior: "none",
          metadata: { ...((sub as any)?.metadata || {}), planTier: plan },
        });

        const updated = (await stripe.subscriptions.retrieve(stripeSubId, {
          expand: ["items.data.price"],
        })) as unknown as Stripe.Subscription;

        const mapped = mapStripeToDbFields(updated);

        await db.subscription.upsert({
          where: { stripeSubscriptionId: mapped.stripeSubscriptionId },
          create: {
            ...mapped,
            userId: user.id,
            planTier: plan as any,
            setupFeePaidAt: null,
            meta: {},
          },
          update: {
            ...mapped,
            planTier: plan as any,
          },
        });

        revalidatePath("/account");
        return NextResponse.redirect(new URL("/account", req.url));
      }

      case "cancel_at_period_end": {
        if (!user.stripeCustomerId) {
          return new NextResponse("No Stripe customer", { status: 400 });
        }
        const current =
          user.subscriptions?.[0] ??
          (await db.subscription.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
          }));
        const stripeSubId = current?.stripeSubscriptionId;
        if (!stripeSubId) {
          return new NextResponse("No Stripe subscription to cancel", {
            status: 400,
          });
        }

        await stripe.subscriptions.update(stripeSubId, {
          cancel_at_period_end: true,
        });

        const updated = (await stripe.subscriptions.retrieve(
          stripeSubId
        )) as unknown as Stripe.Subscription;
        const mapped = mapStripeToDbFields(updated);

        await db.subscription.updateMany({
          where: { userId: user.id, stripeSubscriptionId: stripeSubId },
          data: {
            cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
            status: mapped.status,
            currentPeriodEnd: mapped.currentPeriodEnd,
          },
        });

        revalidatePath("/account");
        return NextResponse.redirect(new URL("/account", req.url));
      }

      case "resume": {
        if (!user.stripeCustomerId) {
          return new NextResponse("No Stripe customer", { status: 400 });
        }
        const current =
          user.subscriptions?.[0] ??
          (await db.subscription.findFirst({
            where: { userId: user.id },
            orderBy: { createdAt: "desc" },
          }));
        const stripeSubId = current?.stripeSubscriptionId;
        if (!stripeSubId) {
          return new NextResponse("No Stripe subscription to resume", {
            status: 400,
          });
        }

        await stripe.subscriptions.update(stripeSubId, {
          cancel_at_period_end: false,
        });

        const updated = (await stripe.subscriptions.retrieve(
          stripeSubId
        )) as unknown as Stripe.Subscription;
        const mapped = mapStripeToDbFields(updated);

        await db.subscription.updateMany({
          where: { userId: user.id, stripeSubscriptionId: stripeSubId },
          data: {
            cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
            status: mapped.status,
            currentPeriodEnd: mapped.currentPeriodEnd,
          },
        });

        revalidatePath("/account");
        return NextResponse.redirect(new URL("/account", req.url));
      }

      default:
        return new NextResponse("Unknown action", { status: 400 });
    }
  } catch (err: any) {
    console.error("ACCOUNT_ACTIONS_ERROR", err);
    return new NextResponse("Internal error performing action", {
      status: 500,
    });
  }
}
