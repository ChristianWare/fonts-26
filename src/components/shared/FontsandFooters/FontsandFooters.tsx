"use client";

import styles from "./FontsandFooters.module.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const cardsData = [
  { id: 1, title: "Fonts" },
  { id: 2, title: "&" },
  { id: 3, title: "Footers" },
  // { id: 4, title: "we offer:" },
];

export default function FontsandFooters() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = gsap.utils.toArray<HTMLDivElement>(
      `.${styles.card}`,
      container
    );

    cards.forEach((card, i) => {
      if (i === 0) return;

      gsap.fromTo(
        card,
        { marginTop: 0 },
        {
          marginTop: "-150px",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div>
      {cardsData.map((card, index) => (
        <Card key={card.id} title={card.title} index={index} />
      ))}
    </div>
  );
}

interface CardProps {
  title: string;
  index: number;
}

function Card({ title, index }: CardProps) {
  return (
    <div className={`${styles.card} ${styles["card" + (index + 1)]}`}>
      <div className={styles.cardInner}>
        <div className={styles.cardContent}>
          <h2 className={styles.titleHeading}>{title}</h2>
        </div>
      </div>
    </div>
  );
}
