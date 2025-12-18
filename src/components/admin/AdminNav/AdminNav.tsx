"use client";

import styles from "./AdminNav.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import House from "@/components/shared/icons/House/House";
// import Cog from "@/components/shared/icons/Cog/Cog";
import Analytics from "@/components/shared/icons/Analytics/Analytics";
import Payment from "@/components/shared/icons/Payment/Payment";
import { signOut } from "next-auth/react";
import LogoutSvg from "@/components/shared/icons/LogoutSvg/LogoutSvg";

export default function AdminNav() {
  const pathname = usePathname();

  const items = [
    {
      href: "/admin",
      label: "Overview",
      icon: <House className={styles.icon} />,
      isActive: (p: string) => p === "/admin",
    },
    {
      href: "/admin/billing/subscriptions/",
      label: "Subscriptions",
      icon: <Analytics className={styles.icon} />,
      isActive: (p: string) => p.startsWith("/account/plan"),
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: <Payment className={styles.icon} />,
      isActive: (p: string) => p.startsWith("/admin/users"),
    },
    // {
    //   href: "/account/settings",
    //   label: "Account Settings",
    //   icon: <Cog className={styles.icon} />,
    //   isActive: (p: string) =>
    //     p === "/account/settings" || p.startsWith("/account/settings/"),
    // },
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
      <button className={styles.signOutBtn} onClick={() => signOut()}>
        <LogoutSvg className={styles.iconii} />
        <span className={styles.btnText}>Sign Out</span>
      </button>
    </nav>
  );
}
