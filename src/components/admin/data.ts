/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

type SubStatus =
  | "active"
  | "trialing"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

function toDateOrNull(ts?: number | null) {
  return ts ? new Date(ts * 1000) : null;
}

function coerceStatus(s?: string | null): SubStatus | null {
  if (!s) return null;
  const ok = new Set<SubStatus>([
    "active",
    "trialing",
    "past_due",
    "canceled",
    "unpaid",
    "incomplete",
    "incomplete_expired",
    "paused",
  ]);
  return ok.has(s as SubStatus) ? (s as SubStatus) : "active";
}

/**
 * Fetch the latest Stripe subscription for a customer, then upsert it
 * into your DB so next loads don’t need Stripe again.
 */
async function fetchAndUpsertLatestSubForCustomer(
  stripeCustomerId: string,
  userId: string
): Promise<{
  stripeSubscriptionId: string | null;
  planTier: string | null;
  status: string | null;
  unitAmount: number | null;
  currency: string | null;
  currentPeriodEnd: Date | null;
}> {
  const list = await stripe.subscriptions.list({
    customer: stripeCustomerId,
    status: "all",
    limit: 1,
    expand: ["data.items.data.price"],
  });

  const s = list.data[0];
  if (!s) {
    return {
      stripeSubscriptionId: null,
      planTier: null,
      status: null,
      unitAmount: null,
      currency: null,
      currentPeriodEnd: null,
    };
  }

  const price = s.items.data[0]?.price || null;
  const unitAmount = price?.unit_amount ?? null;
  const currency = (price?.currency ?? "usd").toUpperCase();
  const planTier =
    (s.metadata?.planTier as string | undefined) ??
    (price?.nickname as string | undefined) ??
    null;

  const trialEnd = (s as any).trial_end as number | undefined;
  const cpe = (s as any).current_period_end as number | undefined;
  const nextAt = trialEnd ?? cpe ?? null;

  const stripeSubscriptionId = s.id;
  const status = coerceStatus(s.status);

  await db.subscription.upsert({
    where: { stripeSubscriptionId },
    create: {
      stripeSubscriptionId,
      stripePriceId: price?.id ?? "",
      userId,
      planTier: (planTier as any) ?? "SOLO",
      status: (status as any) ?? "active",
      unitAmount: unitAmount ?? 0,
      currency,
      currentPeriodEnd: toDateOrNull(nextAt),
      cancelAtPeriodEnd: (s as any).cancel_at_period_end ?? false,
      setupFeePaidAt: null,
      meta: {},
    },
    update: {
      stripePriceId: price?.id ?? "",
      planTier: (planTier as any) ?? undefined,
      status: (status as any) ?? undefined,
      unitAmount: unitAmount ?? undefined,
      currency,
      currentPeriodEnd: toDateOrNull(nextAt),
      cancelAtPeriodEnd: (s as any).cancel_at_period_end ?? false,
      updatedAt: new Date(),
    },
  });

  return {
    stripeSubscriptionId,
    planTier,
    status: status ?? null,
    unitAmount,
    currency,
    currentPeriodEnd: toDateOrNull(nextAt),
  };
}

/* =========================
   KPIs (unchanged)
   ========================= */

export const getAdminKPIs = unstable_cache(
  async () => {
    const now = new Date();
    const in30d = new Date(now);
    in30d.setDate(now.getDate() + 30);

    const relevant: SubStatus[] = ["active", "trialing", "past_due"];

    const [activeCount, mrrCents, upcomingCount, atRiskCount] =
      await Promise.all([
        db.subscription.count({
          where: { status: { in: relevant as any } },
        }),
        db.subscription
          .aggregate({
            _sum: { unitAmount: true },
            where: { status: { in: relevant as any } },
          })
          .then((a) => a._sum.unitAmount ?? 0),
        db.subscription.count({
          where: {
            status: { in: relevant as any },
            cancelAtPeriodEnd: false,
            currentPeriodEnd: { gte: now, lte: in30d },
          },
        }),
        db.subscription.count({
          where: { status: "past_due" as any },
        }),
      ]);

    return { activeCount, mrr: mrrCents, upcomingCount, atRiskCount };
  },
  ["admin:metrics"],
  { tags: ["admin:metrics"], revalidate: 300 }
);

/* =========================
   Users list (full)
   Optional: backfill here too
   ========================= */

export const getUsersWithSubs = unstable_cache(
  async () => {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        stripeCustomerId: true,
        subscriptions: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            stripeSubscriptionId: true,
            planTier: true,
            status: true,
            unitAmount: true,
            currency: true,
            currentPeriodEnd: true,
          },
        },
      },
    });

    const rows = [];
    for (const u of users) {
      const sub = u.subscriptions[0];

      if (!sub && u.stripeCustomerId) {
        // Backfill for users who have a Stripe customer but no DB sub yet
        const filled = await fetchAndUpsertLatestSubForCustomer(
          u.stripeCustomerId,
          u.id
        );
        rows.push({
          id: u.id,
          name: u.name,
          email: u.email,
          stripeCustomerId: u.stripeCustomerId,
          stripeSubscriptionId: filled.stripeSubscriptionId,
          planTier: filled.planTier,
          status: filled.status,
          unitAmount: filled.unitAmount,
          currency: filled.currency,
          currentPeriodEnd: filled.currentPeriodEnd,
        });
      } else {
        rows.push({
          id: u.id,
          name: u.name,
          email: u.email,
          stripeCustomerId: u.stripeCustomerId,
          stripeSubscriptionId: sub?.stripeSubscriptionId ?? null,
          planTier: sub?.planTier ?? null,
          status: sub?.status ?? null,
          unitAmount: sub?.unitAmount ?? null,
          currency: sub?.currency ?? null,
          currentPeriodEnd: sub?.currentPeriodEnd ?? null,
        });
      }
    }

    return rows;
  },
  ["admin:users"],
  { tags: ["admin:users"], revalidate: 300 }
);

/* =========================
   Users list (recent N)
   Backfills missing subs (recommended for the Admin home table)
   ========================= */

export const getRecentUsersWithSubs = unstable_cache(
  async (take = 5) => {
    const users = await db.user.findMany({
      take,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        stripeCustomerId: true,
        subscriptions: {
          orderBy: { createdAt: "desc" },
          take: 1,
          select: {
            stripeSubscriptionId: true,
            planTier: true,
            status: true,
            unitAmount: true,
            currency: true,
            currentPeriodEnd: true,
          },
        },
      },
    });

    const rows = [];
    for (const u of users) {
      const sub = u.subscriptions[0];

      if (!sub && u.stripeCustomerId) {
        const filled = await fetchAndUpsertLatestSubForCustomer(
          u.stripeCustomerId,
          u.id
        );
        rows.push({
          id: u.id,
          name: u.name,
          email: u.email,
          stripeCustomerId: u.stripeCustomerId,
          stripeSubscriptionId: filled.stripeSubscriptionId,
          planTier: filled.planTier,
          status: filled.status,
          unitAmount: filled.unitAmount,
          currency: filled.currency,
          currentPeriodEnd: filled.currentPeriodEnd,
        });
      } else {
        rows.push({
          id: u.id,
          name: u.name,
          email: u.email,
          stripeCustomerId: u.stripeCustomerId,
          stripeSubscriptionId: sub?.stripeSubscriptionId ?? null,
          planTier: sub?.planTier ?? null,
          status: sub?.status ?? null,
          unitAmount: sub?.unitAmount ?? null,
          currency: sub?.currency ?? null,
          currentPeriodEnd: sub?.currentPeriodEnd ?? null,
        });
      }
    }

    return rows;
  },
  ["admin:users:recent"],
  { tags: ["admin:users"], revalidate: 300 }
);

/* =========================
   Subscription metrics (unchanged)
   ========================= */

export const getSubscriptionMetrics = unstable_cache(
  async () => {
    const relevant = ["active", "trialing", "past_due"] as const;

    const [activeCount, trialingCount, pastDueCount, mrrSum] =
      await Promise.all([
        db.subscription.count({ where: { status: "active" as any } }),
        db.subscription.count({ where: { status: "trialing" as any } }),
        db.subscription.count({ where: { status: "past_due" as any } }),
        db.subscription.aggregate({
          _sum: { unitAmount: true },
          where: { status: { in: relevant as any } },
        }),
      ]);

    return {
      activeCount,
      trialingCount,
      pastDueCount,
      mrrCents: mrrSum._sum.unitAmount ?? 0,
    };
  },
  ["admin:subs:metrics"],
  { tags: ["admin:subs"], revalidate: 300 }
);

/* =========================
   Subscriptions listing (unchanged)
   ========================= */

export async function listSubscriptions({
  page,
  pageSize,
  plan,
  status,
  q,
}: {
  page: number;
  pageSize: number;
  plan: string; // PlanTier or ""
  status: string; // SubStatus or ""
  q: string; // search text
}) {
  const where: any = {};
  if (plan) where.planTier = plan;
  if (status) where.status = status as any;
  if (q) {
    where.user = {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    };
  }

  const [total, subs] = await Promise.all([
    db.subscription.count({ where }),
    db.subscription.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        user: {
          select: { id: true, name: true, email: true, stripeCustomerId: true },
        },
      },
    }),
  ]);

  const rows = subs.map((s) => ({
    id: s.id,
    userId: s.user.id,
    userName: s.user.name,
    userEmail: s.user.email,
    planTier: s.planTier,
    status: s.status,
    unitAmount: s.unitAmount,
    currentPeriodEnd: s.currentPeriodEnd ? new Date(s.currentPeriodEnd) : null,
    cancelAtPeriodEnd: s.cancelAtPeriodEnd,
    stripeCustomerId: s.user.stripeCustomerId!,
    stripeSubscriptionId: s.stripeSubscriptionId,
  }));

  return { total, rows };
}

/* =========================
   User details (unchanged)
   ========================= */

export async function getUserDetails(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      subscriptions: { orderBy: { createdAt: "desc" }, take: 5 },
      accounts: true,
      Post: { orderBy: { createdAt: "desc" }, take: 3 },
    },
  });
  return user;
}
