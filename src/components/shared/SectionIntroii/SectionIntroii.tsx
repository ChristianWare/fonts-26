"use client";

import styles from "./SectionIntroii.module.css";

interface Props {
  title: string;
  color?: string;
}

export default function SectionIntroii({ title, color = "" }: Props) {
  return (
    <section className={styles.container}>
      <span className={styles.dot} />
      <span className={`${styles.text} ${styles[color]}`}>{title}</span>
    </section>
  );
}
