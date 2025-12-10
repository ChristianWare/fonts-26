"use client";

import { useEffect, useRef, useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Benefits.module.css";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Image from "next/image";
import AboutIllustration from "../../../../public/illustrations/aboutIllustration.png";

const data = [
  {
    id: 1,
    title: "Fast, reliable delivery",
    Description: "Deadlines met, launches smooth.",
  },
  {
    id: 2,
    title: "Clear, no-surprise pricing",
    Description: "Flat, transparent scope.",
  },
  {
    id: 3,
    title: "Everything under one roof",
    Description: "Strategy, UX, build, and integrations.",
  },
  {
    id: 4,
    title: "Fixed milestones",
    Description: "Weekly checkpoints with visible progress.",
  },
];

export default function Benefits() {
  const [activeCount, setActiveCount] = useState(1);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      const bottomEl = bottomRef.current;
      if (!bottomEl) return;

      const rect = bottomEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalCards = data.length;
      const totalScrollable = bottomEl.offsetHeight - viewportHeight;

      if (totalScrollable <= 0) {
        setActiveCount(totalCards);
        return;
      }

      const scrolledInside = Math.min(Math.max(-rect.top, 0), totalScrollable);
      const progress = scrolledInside / totalScrollable;
      const stepSize = 1 / totalCards;
      const count = Math.max(
        1,
        Math.min(totalCards, 1 + Math.floor(progress / stepSize))
      );

      setActiveCount(count);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <LayoutWrapper>
          <div className={styles.inner}>
            <div className={styles.top}>
              <div className={styles.imgContainer}>
                <Image
                  src={AboutIllustration}
                  alt=''
                  fill
                  className={styles.img}
                />
              </div>
              <SectionIntroii title='Benefits' />
              <h2 className={styles.heading}>
                Why work with <br />
                <span className={styles.span}>Fonts & Footers?</span>
              </h2>
              <p className={styles.copy}>
                Partnering with Fonts & Footers means gaining a dedicated team
                focused on delivering quality, transparency, and
                efficiency—helping your business achieve its goals with
                confidence and ease.
              </p>
            </div>

            <div
              ref={bottomRef}
              className={styles.bottom}
              style={{ height: `${100 * data.length}vh` }}
            >
              <div className={styles.mapBox}>
                {data.map((item, index) => {
                  const isVisible = index < activeCount;
                  return (
                    <div
                      key={item.id}
                      className={`${styles.card} ${
                        isVisible ? styles.cardVisible : styles.cardHidden
                      }`}
                    >
                      <div className={styles.cardContent}>
                        <h3 className={styles.title}>{item.title}</h3>
                        <p className={styles.desc}>{item.Description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
