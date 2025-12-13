/* eslint-disable react-hooks/refs */
"use client";

import styles from "./WorkHero.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Nav from "@/components/shared/Nav/Nav";

gsap.registerPlugin(ScrollTrigger);

const Silk = dynamic(() => import("../../shared/Silk"), {
  ssr: false,
});

export default function WorkHero() {
  const refs = {
    heading: useRef<HTMLHeadingElement>(null),
    overlay: useRef<HTMLDivElement>(null),
  };

  useGSAP(() => {
    if (refs.overlay.current) {
      gsap.fromTo(
        refs.overlay.current,
        { opacity: 0 },
        {
          opacity: 0.7,
          scrollTrigger: {
            trigger: refs.overlay.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    const animateText = (el: HTMLElement | null) => {
      if (!el) return;
      gsap.set(el, { visibility: "visible" });
      const split = new SplitType(el, {
        types: "words",
        lineClass: styles.line,
      });
      gsap.set(split.words, { y: 200, x: -200, opacity: 0 });
      gsap.to(split.words, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.075,
        ease: "power4.out",
        delay: 0.25,
      });
      return () => split.revert();
    };
    const cleanup = animateText(refs.heading.current);
    return () => cleanup && cleanup();
  });

  return (
    <section className={styles.parent}>
      <Nav />
      <div className={styles.container}>
        <div className={styles.silkBg}>
          <Silk
            speed={4}
            scale={1.4}
            color='#7B7481'
            noiseIntensity={1.2}
            rotation={0}
          />
        </div>{" "}
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              <h1 ref={refs.heading} className={styles.heading}>
                Our Work
              </h1>
              <p className={styles.copy}>
                Direct-booking websites and booking flows for owner-led service
                businesses.
              </p>
            </div>
            <div className={styles.bottom}></div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
