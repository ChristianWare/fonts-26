/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Values.module.css";
import Button from "@/components/shared/Button/Button";
import Image, { StaticImageData } from "next/image";
import Arrow from "@/components/shared/icons/Arrow/Arrow";

import Img1 from "../../../../public/images/customer.jpg";
import Img2 from "../../../../public/images/innovate.jpg";
import Img3 from "../../../../public/images/glasses.jpg";
import Img4 from "../../../../public/images/quality.jpg";
import Img5 from "../../../../public/images/integrity.jpg";

import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

type ValueItem = {
  id: number;
  title: string;
  description: string;
  src: StaticImageData;
};

const data: readonly ValueItem[] = [
  {
    id: 1,
    title: "Mobile-first, thumb-ready",
    description: "60 seconds from intent to paid deposit.",
    src: Img1,
  },
  {
    id: 2,
    title: "Plain-English policies",
    description: "$25 holds your spot. Reschedule up to 24h with one tap.",
    src: Img2,
  },
  {
    id: 3,
    title: "Real-world logic",
    description: "Buffers, travel time, flight fields, prep instructions.",
    src: Img3,
  },
  {
    id: 4,
    title: "Accessibility + performance",
    description: "Fast, readable, and inclusive by default.",
    src: Img4,
  },
  {
    id: 5,
    title: "Test, don't guess",
    description: "We watch completion rate, not opinions.",
    src: Img5,
  },
];

export default function Values() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Build an infinite-loop list that preserves titles with images
  const slides: ValueItem[] = useMemo(() => {
    const head = data.slice(0, 2);
    const tail = data.slice(-2);
    return [...tail, ...data, ...head];
  }, []);

  const realStart = 2;
  const realEnd = data.length + 1;
  const [currentIndex, setCurrentIndex] = useState(realStart);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [stepPx, setStepPx] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    function measure() {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const firstSlide = track.querySelector(
        `.${styles.slide}`
      ) as HTMLElement | null;

      let slideWidth = 0;
      if (firstSlide) {
        slideWidth = firstSlide.getBoundingClientRect().width;
      } else if (viewport.offsetWidth) {
        slideWidth = viewport.offsetWidth / 2;
      }

      let gap = 0;
      const cs = getComputedStyle(track);
      const g = cs.gap || cs.columnGap || "0";
      gap = parseFloat(g) || 0;

      setStepPx(slideWidth + gap);
    }

    measure();

    let ro: ResizeObserver | null = null;
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      ro = new ResizeObserver(() => measure());
      if (viewportRef.current) ro.observe(viewportRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("resize", measure);
      if (ro && viewportRef.current) ro.unobserve(viewportRef.current);
    };
  }, []);

  const goPrev = useCallback(() => {
    if (!stepPx || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((i) => i - 1);
  }, [stepPx, isAnimating]);

  const goNext = useCallback(() => {
    if (!stepPx || isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((i) => i + 1);
  }, [stepPx, isAnimating]);

  const handleTransitionEnd = useCallback(() => {
    if (currentIndex === realEnd + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(realStart);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
        })
      );
    } else if (currentIndex === 1) {
      setTransitionEnabled(false);
      setCurrentIndex(realEnd);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
          setIsAnimating(false);
        })
      );
    } else {
      setIsAnimating(false);
    }
  }, [currentIndex, realEnd, realStart]);

  const offsetPx = -(currentIndex * stepPx);

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <SectionIntroii title='Values' />
            <h2 className={styles.heading}>
              Principles <br /> we won’t bend
            </h2>
            <p className={styles.copy}>
              We are committed to delivering exceptional service and value. Our
              core values guide us in everything we do:
            </p>

            <div className={styles.btnContainer}>
              <Button href='/contact' text='Contact us' btnType='black' />
            </div>
          </div>

          <div className={styles.right}>
            <button
              type='button'
              className={styles.leftArrow}
              onClick={goPrev}
              aria-label='Previous'
            >
              <Arrow className={styles.icon} />
            </button>

            <button
              type='button'
              className={styles.rightArrow}
              onClick={goNext}
              aria-label='Next'
            >
              <Arrow className={styles.icon} />
            </button>

            <div className={styles.carousel} ref={viewportRef}>
              <div
                className={styles.track}
                ref={trackRef}
                style={{
                  transform: `translateX(${
                    isFinite(offsetPx) ? offsetPx : 0
                  }px)`,
                  transition: transitionEnabled
                    ? "transform 420ms ease"
                    : "none",
                }}
                onTransitionEnd={handleTransitionEnd}
              >
                {slides.map((slide, i) => (
                  <div key={`${slide.id}-${i}`} className={styles.slide}>
                    <div className={styles.frame}>
                      <Image
                        src={slide.src}
                        alt={slide.title}
                        title={slide.title}
                        fill
                        className={styles.img1}
                        priority={i < 4}
                      />
                      {/* Tan overlay + centered title */}
                      <div className={styles.overlay} />
                      <div className={styles.titleWrap}>
                        <span className={styles.titleText}>{slide.title}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
