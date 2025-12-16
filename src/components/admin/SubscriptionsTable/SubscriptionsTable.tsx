// app/admin/billing/subscriptions/components/SubscriptionsTable.tsx
import Link from "next/link";
import styles from "./SubscriptionsTable.module.css";
import { listSubscriptions } from "../data";
import { format } from "date-fns";

export async function SubscriptionsTable({
  page,
  plan,
  status,
  q,
}: {
  page: number;
  plan: string;
  status: string;
  q: string;
}) {
  const pageSize = 20;
  const { rows, total } = await listSubscriptions({
    page,
    pageSize,
    plan,
    status,
    q,
  });
  const lastPage = Math.max(1, Math.ceil(total / pageSize));

  return (
    <>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Next bill</th>
              <th>Flags</th>
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td>
                  <Link
                    href={`/admin/users/${r.userId}`}
                    className={styles.userLink}
                  >
                    <div className={styles.name}>{r.userName ?? "—"}</div>
                    <div className={styles.email}>{r.userEmail}</div>
                  </Link>
                </td>
                <td>{r.planTier}</td>
                <td>
                  <StatusBadge status={r.status} />
                </td>
                <td>{currency(r.unitAmount)}</td>
                <td>
                  {r.currentPeriodEnd
                    ? format(r.currentPeriodEnd, "MMM d, yyyy")
                    : "—"}
                </td>
                <td>
                  {r.cancelAtPeriodEnd ? (
                    <span className={styles.flag}>Cancels at period end</span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className={styles.actions}>
                  <Link
                    href={`https://dashboard.stripe.com/customers/${r.stripeCustomerId}`}
                    target='_blank'
                    className={styles.actionLink}
                  >
                    Customer
                  </Link>
                  <Link
                    href={`https://dashboard.stripe.com/subscriptions/${r.stripeSubscriptionId}`}
                    target='_blank'
                    className={styles.actionLink}
                  >
                    Subscription
                  </Link>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={7} className={styles.empty}>
                  No subscriptions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pager
        page={page}
        lastPage={lastPage}
        plan={plan}
        status={status}
        q={q}
      />
    </>
  );
}

function Pager({
  page,
  lastPage,
  plan,
  status,
  q,
}: {
  page: number;
  lastPage: number;
  plan: string;
  status: string;
  q: string;
}) {
  const prev = Math.max(1, page - 1);
  const next = Math.min(lastPage, page + 1);

  const hrefFor = (p: number) => {
    const usp = new URLSearchParams();
    if (plan) usp.set("plan", plan);
    if (status) usp.set("status", status);
    if (q) usp.set("q", q);
    usp.set("page", String(p));
    return `?${usp.toString()}`;
  };

  return (
    <div className={styles.pager}>
      <PagerBtn label='← Prev' disabled={page <= 1} href={hrefFor(prev)} />
      <div className={styles.pageInfo}>
        Page {page} / {lastPage}
      </div>
      <PagerBtn
        label='Next →'
        disabled={page >= lastPage}
        href={hrefFor(next)}
      />
    </div>
  );
}

function PagerBtn({
  label,
  disabled,
  href,
}: {
  label: string;
  disabled: boolean;
  href: string;
}) {
  if (disabled) {
    return (
      <span className={`${styles.pagerBtn} ${styles.disabled}`}>{label}</span>
    );
  }
  return (
    <a className={styles.pagerBtn} href={href} aria-label={label}>
      {label}
    </a>
  );
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
  return <span className={`${styles.badge} ${styles[tone]}`}>{status}</span>;
}

function currency(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
