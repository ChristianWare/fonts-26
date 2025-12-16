import Link from "next/link";
import styles from "./UsersTable.module.css";
import { getRecentUsersWithSubs } from "../data";
import { format } from "date-fns";

export async function UsersTable() {
  const rows = await getRecentUsersWithSubs(5); // ← only latest 5

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.heading}>Users & Plans</h2>
        <Link href='/admin/users' className={styles.viewAll}>
          View all →
        </Link>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Next bill</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className={styles.row}>
                <td data-label='User'>
                  {/* Make the whole user cell a link to details */}
                  <Link
                    href={`/admin/users/${r.id}`}
                    className={styles.userLink}
                    title='Open user details'
                  >
                    <div className={styles.userCell}>
                      <div className={styles.name}>{r.name ?? "—"}</div>
                      <div className={styles.email}>{r.email}</div>
                    </div>
                  </Link>
                </td>
                <td data-label='Plan'>{r.planTier ?? "—"}</td>
                <td data-label='Status'>
                  <StatusBadge status={r.status ?? "—"} />
                </td>
                <td data-label='Amount'>
                  {r.unitAmount != null ? currency(r.unitAmount) : "—"}
                </td>
                <td data-label='Next bill'>
                  {r.currentPeriodEnd
                    ? format(new Date(r.currentPeriodEnd), "MMM d, yyyy")
                    : "—"}
                </td>
                <td data-label='Manage' className={styles.actions}>
                  {r.stripeCustomerId ? (
                    <Link
                      href={`https://dashboard.stripe.com/customers/${r.stripeCustomerId}`}
                      target='_blank'
                      className={styles.actionLink}
                    >
                      Stripe Customer
                    </Link>
                  ) : (
                    <span className={styles.mutedText}>No Stripe ID</span>
                  )}
                  {r.stripeSubscriptionId ? (
                    <Link
                      href={`https://dashboard.stripe.com/subscriptions/${r.stripeSubscriptionId}`}
                      target='_blank'
                      className={styles.actionLink}
                    >
                      Subscription
                    </Link>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function currency(cents: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "active" || status === "trialing"
      ? "ok"
      : status === "past_due"
        ? "warn"
        : status === "canceled" || status === "unpaid"
          ? "bad"
          : "muted";
  return (
    <span
      className={`${styles.badge} ${
        tone === "ok"
          ? styles.ok
          : tone === "warn"
            ? styles.warn
            : tone === "bad"
              ? styles.bad
              : styles.badgeMuted
      }`}
    >
      {status}
    </span>
  );
}
