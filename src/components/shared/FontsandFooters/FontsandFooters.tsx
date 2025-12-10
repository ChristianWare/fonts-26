"use client";

import styles from "./FontsandFooters.module.css";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FontsandFootersProps {
  text1: string;
  text2: string;
  text3: string;
}

interface CardProps {
  title: string;
  index: number;
}

export default function FontsandFooters({
  text1,
  text2,
  text3,
}: FontsandFootersProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const cardsData = useMemo(
    () => [
      { id: 1, title: text1 },
      { id: 2, title: text2 },
      { id: 3, title: text3 },
    ],
    [text1, text2, text3]
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLDivElement>("." + styles.card);

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
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef}>
      {cardsData.map((card, index) => (
        <Card key={card.id} title={card.title} index={index} />
      ))}
    </div>
  );
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
