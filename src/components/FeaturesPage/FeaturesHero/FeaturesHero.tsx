"use client";

/* eslint-disable react-hooks/refs */
import styles from "./FeaturesHero.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Nav from "@/components/shared/Nav/Nav";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

const data = [
  {
    id: 1,
    title: "A clean, fast client-facing booking flow",
  },
  {
    id: 2,
    title: "An owner dashboard where you can actually see what’s happening",
  },
  {
    id: 3,
    title: "Team tools for staff and drivers/trainers",
  },
  {
    id: 4,
    title:
      "Optional client accounts so your best people can rebook in a few taps",
  },
];

gsap.registerPlugin(ScrollTrigger);

const Silk = dynamic(() => import("../../shared/Silk"), {
  ssr: false,
});

export default function FeaturesHero() {
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
            <div className={styles.left}>
              <SectionIntroii title='Features' color='tan' />
              <h1 ref={refs.heading} className={styles.heading}>
                What you get with a <br /> direct-booking <br />
                site from us
              </h1>
              <p className={styles.copy}>
                Not just a pretty homepage. A full booking system built around
                how your business actually runs.
              </p>
            </div>
            <div className={styles.right}>
              <p className={styles.subheading}>
                When we say “direct-booking website,” we don’t mean a
                nice-looking brochure with a button that sends people to a
                clunky app. We mean a full stack:
              </p>
              <div className={styles.mapDataContainer}>
                {data.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <span className={styles.bulletPoint} />
                    <p className={styles.title}>{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
