/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useLayoutEffect, useRef, useState } from "react";
import styles from "./ScrollHorizontalText.module.css";

interface Props {
  text: string;
  text2?: string;
  text3?: string;
  /** Pixels per second the marquee should move (higher = faster). */
  pxPerSec?: number;
  /** How many repeated text blocks per row. Increase if your row is too short. */
  repeatCount?: number;
}

export default function ScrollHorizontalText({
  text,
  text2,
  text3,
  pxPerSec = 80,
  repeatCount = 24,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [durationSec, setDurationSec] = useState(45);

  useLayoutEffect(() => {
    const rowEl = rowRef.current;
    if (!rowEl) return;

    const update = () => {
      const rowWidth = rowEl.offsetWidth;
      if (rowWidth > 0 && pxPerSec > 0) {
        setDurationSec(rowWidth / pxPerSec);
      }
    };

    // Initial measure
    update();

    // Recalculate on resize/layout changes
    const ro = new ResizeObserver(update);
    ro.observe(rowEl);

    // Fonts loading can change widths; also listen to window resize
    const onResize = () => update();
    window.addEventListener("resize", onResize);

    // Try again after next paint for safety (e.g., font swap)
    const raf = requestAnimationFrame(update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [text, text2, text3, pxPerSec, repeatCount]);

  const items = Array.from({ length: repeatCount });

  return (
    <div className={styles.slider}>
      <div
        ref={trackRef}
        className={styles.track}
        style={{ ["--marquee-duration" as any]: `${durationSec}s` }}
      >
        <div ref={rowRef} className={styles.row}>
          {items.map((_, index) => (
            <div key={`a-${index}`} className={`${styles.text} subheading`}>
              <span className={styles.span}>•</span> {text}
              {text2 && (
                <>
                  <span className={styles.span}>•</span>
                  {text2}
                </>
              )}
              {text3 && (
                <>
                  <span className={styles.span}>•</span>
                  {text3}
                </>
              )}
            </div>
          ))}
        </div>

        <div className={styles.row} aria-hidden='true'>
          {items.map((_, index) => (
            <div key={`b-${index}`} className={`${styles.text} subheading`}>
              {text}
              {text2 && (
                <>
                  <span className={styles.span}>•</span>
                  {text2}
                </>
              )}
              {text3 && (
                <>
                  <span className={styles.span}>•</span>
                  {text3}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
