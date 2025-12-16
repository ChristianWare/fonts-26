// src/components/admin/WebhookTable/WebhookTable.tsx
import styles from "./WebhookTable.module.css";
import Link from "next/link";
import { getWebhookEvents } from "../webhooks/data";
import { format } from "date-fns";
import WebhookPager from "./WebhookPager";

export async function WebhookTable({ page = 1 }: { page?: number }) {
  const { rows, lastPage } = await getWebhookEvents(page, 25);

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Type</th>
            <th>Status</th>
            <th>Event</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td>{format(new Date(r.createdAt), "MMM d, yyyy HH:mm")}</td>
              <td>{r.type}</td>
              <td>
                <span className={`${styles.badge} ${styles[r.status]}`}>
                  {r.status}
                </span>
              </td>
              <td className={styles.mono}>{r.stripeEventId}</td>
              <td>
                <Link href={`/admin/billing/webhooks/${r.id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <WebhookPager page={page} lastPage={lastPage} />
    </div>
  );
}
