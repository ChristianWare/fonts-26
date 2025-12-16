// components/FAQPage/FAQMenu/FAQMenu.tsx
"use client";

import styles from "./FAQMenu.module.css";
import Button from "@/components/shared/Button/Button";

type MenuItem = {
  id: number;
  key: "home" | "pricing" | "about" | "work" | "blog" | "contact";
  title: string;
  href: string; // anchors on /faqs
};

const MENU: readonly MenuItem[] = [
  { id: 1, key: "home", title: "General", href: "/faqs#faq-home" },
  {
    id: 2,
    key: "pricing",
    title: "Pricing & Billing",
    href: "/faqs#faq-pricing",
  },
  {
    id: 3,
    key: "about",
    title: "About Fonts & Footers",
    href: "/faqs#faq-about",
  },
  { id: 4, key: "work", title: "Projects & Process", href: "/faqs#faq-work" },
  {
    id: 5,
    key: "blog",
    title: "Content, SEO & Reviews",
    href: "/faqs#faq-blog",
  },
  {
    id: 6,
    key: "contact",
    title: "Getting Started",
    href: "/faqs#faq-contact",
  },
];

export default function FAQMenu() {
  return (
    <section className={styles.container}>
      <div className={styles.mapDataContainer}>
        {MENU.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.btnContainer}>
              <Button
                href={item.href}
                btnType='grayOutline'
                text={item.title}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
