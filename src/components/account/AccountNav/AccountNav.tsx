// components/account/AccountNav/AccountNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./AccountNav.module.css";
import House from "@/components/shared/icons/House/House";
import Cog from "@/components/shared/icons/Cog/Cog";
import Analytics from "@/components/shared/icons/Analytics/Analytics";
import Payment from "@/components/shared/icons/Payment/Payment";

export default function AccountNav() {
  const pathname = usePathname();

  const items = [
    {
      href: "/account",
      label: "Overview",
      icon: <House className={styles.icon} />,
      isActive: (p: string) => p === "/account",
    },
    {
      href: "/account/plan",
      label: "My Plan",
      icon: <Analytics className={styles.icon} />,
      isActive: (p: string) => p.startsWith("/account/plan"),
    },
    {
      href: "/account/billing/history",
      label: "Billing History",
      icon: <Payment className={styles.icon} />,
      isActive: (p: string) => p.startsWith("/account/billing/history"),
    },
    {
      href: "/account/settings",
      label: "Account Settings",
      icon: <Cog className={styles.icon} />,
      isActive: (p: string) =>
        p === "/account/settings" || p.startsWith("/account/settings/"),
    },
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {items.map((it) => {
          const active = it.isActive(pathname);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={`${styles.link} ${active ? styles.active : ""}`}
              >
                {it.icon}
                <span
                  className={`${styles.linkText} ${active ? styles.active : ""}`}
                >
                  {it.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
