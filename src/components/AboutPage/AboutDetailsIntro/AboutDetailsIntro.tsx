"use client";

import styles from "./AboutDetailsIntro.module.css";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Image from "next/image";
import Img2 from "../../../../public/illustrations/telescopeIllustration.png";

export default function AboutDetailsIntro() {
  const [lettersRef, setLettersRef] = useArrayRef();
  const triggerRef = useRef(null);

  function useArrayRef(): [
    React.MutableRefObject<HTMLSpanElement[]>,
    (ref: HTMLSpanElement) => void
  ] {
    const lettersRef = useRef<HTMLSpanElement[]>([]);
    lettersRef.current = [];
    return [lettersRef, (ref) => ref && lettersRef.current.push(ref)];
  }

  gsap.registerPlugin(ScrollTrigger);

  const text =
    "Fonts & Footers is a small, focused web studio that builds direct-booking websites for owner-led service businesses.";

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        scrub: 0.5,
        start: "top center",
        end: "bottom center",
        markers: false,
      },
    });

    lettersRef.current.forEach((letter, index) => {
      tl.to(
        letter,
        {
          color: "#242422",
          duration: 0.2,
        },
        index * 0.015
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, [lettersRef]);

  return (
    // <section className={styles.container} ref={triggerRef}>
    <section className={styles.parent} ref={triggerRef}>
      <div className={styles.container}>
        <div className={styles.cornerContainer}>
          <div className={styles.corner}>
            <SectionIntroii title='About Us' />
          </div>
        </div>{" "}
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.left}>
              <h2 className={styles.heading}>
                {text.split("").map((letter, index) => (
                  <span
                    key={index}
                    className={styles.revealText}
                    ref={setLettersRef}
                  >
                    {letter}
                  </span>
                ))}
              </h2>
            </div>
            <div className={styles.bottom}>
              <div className={styles.imgContainer}>
                <Image
                  src={Img2}
                  alt='Telescope illustration'
                  width={175}
                  height={175}
                  className={styles.img}
                />
              </div>
              <p className={styles.copy}>
                We’re not a giant agency with layers of account managers. We’re
                a lean partner that cares about one thing: Turning confused
                clickers into confident, booked clients. We do that by combining
                clean design, fast tech, and a deep obsession with how real
                people actually book appointments on their phones.
              </p>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
