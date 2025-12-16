// components/account/ChargesTable/ChargesTable.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { auth } from "../../../../auth";
import { db } from "@/lib/db";
import styles from "./ChargesTable.module.css";
import { format } from "date-fns";
import Link from "next/link";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

function currency(cents?: number | null, code = "USD") {
  if (cents == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

/**
 * Best-effort receipt link:
 * 1) charge.receipt_url (payment receipt)
 * 2) invoice.hosted_invoice_url (invoice page)
 * 3) invoice.invoice_pdf (PDF fallback)
 */
function getReceiptLink(inv: Stripe.Invoice): string | null {
  const c = (inv as any).charge as Stripe.Charge | string | null | undefined;
  const chargeObj =
    typeof c === "object" && c && "id" in c ? (c as Stripe.Charge) : null;

  const receiptUrl =
    chargeObj?.receipt_url ??
    (inv.hosted_invoice_url as string | null | undefined) ??
    (inv.invoice_pdf as string | null | undefined) ??
    null;

  return receiptUrl ?? null;
}

export default async function ChargesTable({
  limit = 5,
  showViewAllLink = false,
}: {
  limit?: number;
  showViewAllLink?: boolean;
}) {
  const session = await auth();
  if (!session) return null;

  const where = session.user?.id
    ? { id: session.user.id }
    : session.user?.email
      ? { email: session.user.email }
      : null;

  if (!where) return null;

  const user = await db.user.findUnique({
    where,
    select: { stripeCustomerId: true },
  });
  if (!user?.stripeCustomerId) {
    return (
      <section className={styles.card}>
        <h2 className={styles.title}>Billing history</h2>
        <p className={styles.muted}>No Stripe customer found.</p>
      </section>
    );
  }

  const listLimit = Math.min(Math.max(limit, 1), 100);

  const invoices = await stripe.invoices.list({
    customer: user.stripeCustomerId,
    limit: listLimit,
    expand: [
      "data.charge",
      "data.payment_intent.latest_charge", // if 'charge' isn't directly populated
      "data.lines.data.price", // even if typings don’t declare it, Stripe will expand it
    ],
  });

  const rows = invoices.data.map((inv) => {
    const created = new Date((inv.created ?? 0) * 1000);
    const status = inv.status ?? "open";
    const amountPaid = inv.amount_paid ?? 0;
    const currencyCode = (inv.currency ?? "usd").toUpperCase();

    // Prefer a human label:
    // 1) line.price.nickname (via any to avoid TS complaints on older typings)
    // 2) line.description
    const line0 = inv.lines?.data?.[0];
    const nicknameFromPrice = (
      line0 ? (line0 as any)?.price?.nickname : undefined
    ) as string | undefined;
    const nickname =
      nicknameFromPrice ??
      (line0?.description as string | undefined) ??
      "Subscription";

    // If charge wasn’t expanded, also attempt PI.latest_charge
    let receiptUrl = getReceiptLink(inv);
    if (!receiptUrl) {
      const pi: any = (inv as any).payment_intent;
      const latest = pi?.latest_charge as Stripe.Charge | undefined;
      receiptUrl = latest?.receipt_url ?? null;
    }

    return {
      id: inv.id,
      date: created,
      description: nickname,
      amountPaid,
      currency: currencyCode,
      status,
      receiptUrl,
    };
  });

  rows.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <section>
        <h2 className={styles.title}>Billing history</h2>
      <div className={styles.card}>
        {rows.length === 0 ? (
          <p className={styles.muted}>No invoices yet.</p>
        ) : (
          <>
            <div className={styles.tableWrap}>
              <table className={styles.table} role='table'>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td data-label='Date'>{format(r.date, "MMM d, yyyy")}</td>
                      <td data-label='Description'>{r.description}</td>
                      <td data-label='Status' className={styles.status}>
                        {r.status}
                      </td>
                      <td data-label='Amount'>
                        {currency(r.amountPaid, r.currency)}
                      </td>
                      <td data-label='Receipt'>
                        {r.receiptUrl ? (
                          <a
                            href={r.receiptUrl}
                            target='_blank'
                            rel='noreferrer'
                            className={styles.link}
                          >
                            View receipt ↗
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showViewAllLink && (
              <div style={{ marginTop: "40px" }}>
                <Link href='/account/billing/history' className={styles.link}>
                  View all billing history →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
