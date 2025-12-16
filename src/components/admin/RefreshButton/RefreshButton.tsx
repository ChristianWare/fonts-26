// app/admin/components/RefreshButton.tsx
"use client";

import { useTransition } from "react";
import styles from "./RefreshButton.module.css";

export default function RefreshButton() {
  const [pending, start] = useTransition();

  return (
    <button
      className={styles.btn}
      onClick={() => start(() => refresh())}
      disabled={pending}
      aria-busy={pending}
      title='Recompute metrics & refresh'
    >
      {pending ? "Refreshing…" : "Refresh"}
    </button>
  );
}

async function refresh() {
  await fetch("/admin/revalidate", { method: "POST" });
  // soft refresh:
  if (typeof window !== "undefined") window.location.reload();
}
