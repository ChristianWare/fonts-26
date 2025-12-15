/* eslint-disable react-hooks/refs */
"use client";

import styles from "./ContactHero.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Nav from "@/components/shared/Nav/Nav";
import SectionIntroii from "../shared/SectionIntroii/SectionIntroii";
import Email from "../shared/icons/Email/Email";
import LinkedIn from "../shared/icons/LinkedIn/LinkedIn";
import Instagram from "../shared/icons/Instagram/Instagram";
import Calendarii from "../shared/icons/Calendarii/Calendarii";
import Img2 from "../../../public/images/chris.jpg";
import Image from "next/image";

const data = [
  {
    id: 1,
    title: "Chris Ware",
    desc: "Founder & CEO • chris@fontsandfooters.com",
    src: Img2,
  },
  {
    id: 2,
    title: "General Inquiries",
    desc: "hello@fontsandfooters.eco",
    icon: <Email className={styles.icon} />,
  },
  {
    id: 3,
    title: "LinkedIn",
    desc: "linkedin.com/fontsandfooters",
    icon: <LinkedIn className={styles.icon} />,
  },
  {
    id: 4,
    title: "Instagram",
    desc: "instagram.com/fontsandfooters",
    icon: <Instagram className={styles.icon} />,
  },
  {
    id: 5,
    title: "Calendly",
    desc: "calendly.com/fontsandfooter",
    icon: <Calendarii className={styles.icon} />,
  },
  // {
  //   id: 6,
  //   title: "Customer service",
  //   desc: "+32 470 108 222",
  //   icon: <Phone className={styles.icon} />,
  // },
];

gsap.registerPlugin(ScrollTrigger);

const Silk = dynamic(() => import("../../components/shared/Silk"), {
  ssr: false,
});

export default function ContactHero() {
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
              <SectionIntroii title='Contact Us' color='tan' />
              <h1 ref={refs.heading} className={styles.heading}>
                Every meaningful project starts <br /> with a conversation.
              </h1>
              <p className={styles.copy}>
                Have a question, need a quote, or just curious whether a custom
                booking platform is right for you? Drop a line — no strings
                attached. We reply within one business day.
              </p>
            </div>
            <div className={styles.right}>
              <div className={styles.mapDataContainer}>
                {data.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.cardLeft}>
                      <div className={styles.title}>{item.title}</div>
                      <p className={styles.desc}>{item.desc}</p>
                    </div>
                    <div className={styles.cardRight}>
                      {item.src && (
                        <Image
                          src={item.src}
                          alt={item.title}
                          width={48}
                          height={48}
                          className={styles.imgii}
                        />
                      )}

                      {item.icon && (
                        <div className={styles.iconBox}>{item.icon}</div>
                      )}
                    </div>
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
