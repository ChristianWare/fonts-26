"use client";

import styles from "./SectionIntroii.module.css";

interface Props {
  title: string;
  color?: string;
  dot?: boolean;
}

export default function SectionIntroii({
  title,
  color = "",
  dot = true,
}: Props) {
  return (
    <section className={styles.container}>
      {dot && <span className={styles.dot} />}
      <span className={`${styles.text} ${styles[color]}`}>{title}</span>
    </section>
  );
}
