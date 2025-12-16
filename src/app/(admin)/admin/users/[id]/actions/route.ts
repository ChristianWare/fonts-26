/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(admin)/admin/users/[id]/actions/route.ts
import { auth } from "../../../../../../../auth";
import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/lib/db";
import Stripe from "stripe";
import { revalidateTag } from "next/cache";

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

/** Normalize Stripe subscription fields across snake_case / camelCase typings */
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

  const currentPeriodEndUnix =
    readSubField<number>(s, "current_period_end", "currentPeriodEnd") ?? null;
  const cancelAtPeriodEnd =
    readSubField<boolean>(s, "cancel_at_period_end", "cancelAtPeriodEnd") ??
    false;

  const item0 = s?.items?.data?.[0] ?? null;
  const price = item0?.price ?? null;

  const unitAmount =
    readSubField<number>(price, "unit_amount", "unitAmount") ?? 0;
  const currencyRaw = (price?.currency ?? "usd") as string;
  const currency = currencyRaw.toUpperCase();
  const stripePriceId = price?.id ?? "";

  return {
    stripeSubscriptionId: s.id as string,
    stripePriceId,
    status: s.status as any,
    unitAmount,
    currency,
    currentPeriodEnd: currentPeriodEndUnix
      ? new Date(currentPeriodEndUnix * 1000)
      : null,
    cancelAtPeriodEnd,
  };
}

export async function POST(
  req: NextRequest,
  ctx: RouteContext<"/admin/users/[id]/actions">
) {
  const { id: userId } = await ctx.params;

  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 1 },
    },
  });
  if (!user) return new NextResponse("User not found", { status: 404 });

  const form = await req.formData();
  const action = String(form.get("action") || "");

  try {
    switch (action) {
      case "change_plan": {
        const plan = String(form.get("plan") || "") as Plan;
        if (!plan) return new NextResponse("Missing plan", { status: 400 });

        if (!user.stripeCustomerId) {
          return new NextResponse("User has no Stripe customer", {
            status: 400,
          });
        }

        const current =
          user.subscriptions[0] ??
          (await db.subscription.findFirst({
            where: { userId },
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

        const firstItemId = (sub as any)?.items?.data?.[0]?.id ?? null;
        if (!firstItemId) {
          return new NextResponse("No subscription item found", {
            status: 400,
          });
        }

        await stripe.subscriptions.update(stripeSubId, {
          items: [{ id: firstItemId, price: newPrice }],
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

        revalidateTag("admin:users");
        revalidateTag("admin:metrics");
        return NextResponse.redirect(
          new URL(`/admin/users/${userId}`, req.url)
        );
      }

      case "cancel_at_period_end": {
        if (!user.stripeCustomerId) {
          return new NextResponse("User has no Stripe customer", {
            status: 400,
          });
        }
        const current =
          user.subscriptions[0] ??
          (await db.subscription.findFirst({
            where: { userId },
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
          where: { userId, stripeSubscriptionId: stripeSubId },
          data: {
            cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
            status: mapped.status,
            currentPeriodEnd: mapped.currentPeriodEnd,
          },
        });

        revalidateTag("admin:users");
        revalidateTag("admin:metrics");
        return NextResponse.redirect(
          new URL(`/admin/users/${userId}`, req.url)
        );
      }

      case "resume": {
        if (!user.stripeCustomerId) {
          return new NextResponse("User has no Stripe customer", {
            status: 400,
          });
        }
        const current =
          user.subscriptions[0] ??
          (await db.subscription.findFirst({
            where: { userId },
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
          where: { userId, stripeSubscriptionId: stripeSubId },
          data: {
            cancelAtPeriodEnd: mapped.cancelAtPeriodEnd,
            status: mapped.status,
            currentPeriodEnd: mapped.currentPeriodEnd,
          },
        });

        revalidateTag("admin:users");
        revalidateTag("admin:metrics");
        return NextResponse.redirect(
          new URL(`/admin/users/${userId}`, req.url)
        );
      }

      case "delete_user": {
        if (user.stripeCustomerId) {
          try {
            await stripe.customers.del(user.stripeCustomerId);
          } catch {
            // ignore
          }
        }

        await db.subscription.deleteMany({ where: { userId } });
        await db.account.deleteMany({ where: { userId } });
        await db.user.delete({ where: { id: userId } });

        revalidateTag("admin:users");
        revalidateTag("admin:metrics");
        return NextResponse.redirect(new URL(`/admin`, req.url));
      }

      default:
        return new NextResponse("Unknown action", { status: 400 });
    }
  } catch (err: any) {
    console.error("ADMIN_USER_ACTION_ERROR", err);
    return new NextResponse("Internal error performing action", {
      status: 500,
    });
  }
}
