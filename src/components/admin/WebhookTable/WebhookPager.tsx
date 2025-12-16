// src/components/admin/WebhookTable/WebhookPager.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./WebhookTable.module.css";

export default function WebhookPager({
  page,
  lastPage,
}: {
  page: number;
  lastPage: number;
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const go = (p: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className={styles.pager}>
      <button
        className={styles.btn}
        onClick={() => go(Math.max(1, page - 1))}
        disabled={page <= 1}
      >
        ← Prev
      </button>
      <div className={styles.pageInfo}>
        Page {page} of {lastPage}
      </div>
      <button
        className={styles.btn}
        onClick={() => go(Math.min(lastPage, page + 1))}
        disabled={page >= lastPage}
      >
        Next →
      </button>
    </div>
  );
}
