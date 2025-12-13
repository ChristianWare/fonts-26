/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./MoreProjects.module.css";
import Image from "next/image";
import { projects } from "@/lib/data";
import Arrow from "@/components/icons/Arrow/Arrow";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Button from "@/components/shared/Button/Button";

export default function MoreProjects({
  excludeSlug,
}: {
  excludeSlug?: string;
}) {
  const visible = useMemo(
    () => projects.filter((p) => p.slug !== excludeSlug),
    [excludeSlug]
  );
  const tripled = useMemo(
    () => [...visible, ...visible, ...visible],
    [visible]
  );
  const baseLen = visible.length;
  const startIndex = baseLen;

  const [index, setIndex] = useState<number>(startIndex);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isShifting, setIsShifting] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const [cardW, setCardW] = useState<number>(500);
  const [gapPx, setGapPx] = useState<number>(32);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const firstCard = track.querySelector<HTMLDivElement>(".card");
      if (firstCard) setCardW(firstCard.offsetWidth);
      const style = window.getComputedStyle(track);
      const cg = parseFloat((style as any).columnGap || style.gap || "0");
      if (Number.isFinite(cg)) setGapPx(cg);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    setIndex(startIndex);
  }, [startIndex]);

  if (baseLen === 0) return null;

  const offsetX = -index * (cardW + gapPx);

  const next = () => {
    if (isShifting || !isAnimating) return;
    setIsShifting(true);
    setIndex((i) => i + 1);
  };

  const prev = () => {
    if (isShifting || !isAnimating) return;
    setIsShifting(true);
    setIndex((i) => i - 1);
  };

  const handleTransitionEnd = () => {
    let newIndex = index;
    let jumped = false;

    if (index >= startIndex + baseLen) {
      newIndex = index - baseLen;
      jumped = true;
    } else if (index < startIndex) {
      newIndex = index + baseLen;
      jumped = true;
    }

    if (jumped) {
      setIsAnimating(false);
      setIndex(newIndex);
      requestAnimationFrame(() => setIsAnimating(true));
    }
    setIsShifting(false);
  };

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <SectionIntroii title='More Projects' />
              <h2 className={styles.heading}>
                Different Challenges. <br /> Same precision.
              </h2>
              <div className={styles.btnContainer}>
                <Button href='/work' btnType='accent' text='All case studies' />
              </div>
            </div>
            <div className={styles.topRight}>
              <div className={styles.scrollBtns}>
                <button
                  className={styles.arrowLeft}
                  onClick={prev}
                  aria-label='Previous'
                >
                  <Arrow className={styles.arrow} />
                </button>
                <button
                  className={styles.arrowRight}
                  onClick={next}
                  aria-label='Next'
                >
                  <Arrow className={styles.arrow} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>

      <div className={styles.carouselViewport}>
        <div
          ref={trackRef}
          className={`${styles.track} ${
            isAnimating ? styles.trackAnimating : ""
          }`}
          style={{ transform: `translateX(${offsetX}px)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {tripled.map((item, i) => (
            <div key={`${item.id}-${i}`} className={`${styles.card} card`}>
              <Image
                src={item.src}
                alt={item.title}
                fill
                className={styles.img}
                priority={i === index}
                sizes='(max-width: 1200px) 90vw, 1200px'
              />
              <div className={styles.imgOverlay} />
              <div className={styles.textLayer}>
                <h3 className={styles.feature}>{item.title}</h3>
                <p className={styles.desc}>{item.h1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
