// app/admin/billing/subscriptions/components/SubscriptionsFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./SubscriptionsFilters.module.css";

const planOptions = [
  { value: "", label: "All plans" },
  { value: "SOLO", label: "Solo" },
  { value: "TEAM", label: "Team" },
  { value: "RENTAL_FLEET", label: "Rental/Fleet" },
  { value: "MULTI_LOCATION", label: "Multi-Location" },
  { value: "CUSTOM", label: "Custom" },
];

const statusOptions = [
  { value: "", label: "All status" },
  { value: "active", label: "active" },
  { value: "trialing", label: "trialing" },
  { value: "past_due", label: "past_due" },
  { value: "canceled", label: "canceled" },
  { value: "unpaid", label: "unpaid" },
];

export function SubscriptionsFilters({
  initial,
}: {
  initial: { plan: string; status: string; q: string };
}) {
  const router = useRouter();
  const sp = useSearchParams();

  function apply(params: {
    plan?: string;
    status?: string;
    q?: string;
    page?: string;
  }) {
    const next = new URLSearchParams(sp.toString());
    if (params.plan !== undefined) next.set("plan", params.plan);
    if (params.status !== undefined) next.set("status", params.status);
    if (params.q !== undefined) next.set("q", params.q);
    // reset to page 1 whenever filters/search change
    next.set("page", "1");
    router.push(`?${next.toString()}`);
  }

  return (
    <div className={styles.row}>
      <select
        className={styles.select}
        defaultValue={initial.plan}
        onChange={(e) => apply({ plan: e.target.value })}
      >
        {planOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        defaultValue={initial.status}
        onChange={(e) => apply({ status: e.target.value })}
      >
        {statusOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <input
        className={styles.input}
        placeholder='Search name or email'
        defaultValue={initial.q}
        onKeyDown={(e) => {
          if (e.key === "Enter")
            apply({ q: (e.target as HTMLInputElement).value });
        }}
        onBlur={(e) => apply({ q: e.target.value })}
      />
    </div>
  );
}
