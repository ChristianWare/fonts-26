"use client";

import styles from "./ProblemSection.module.css";
import { useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Image from "next/image";
import Img1 from "../../../../public/images/whydb.jpg";
import Img2 from "../../../../public/images/WhyWeExist.jpg";
import Img3 from "../../../../public/images/subscription.jpg";
import Img4 from "../../../../public/images/analytics.jpg";
import Img5 from "../../../../public/images/approach.jpg";
import Img6 from "../../../../public/images/blog.jpg";

const data = [
  {
    id: 1,
    title: "Clients get lost trying to book",
    desc: "Your booking link is hidden in a menu, buried in your bio, or split across three different pages.",
    src: Img2,
    color: "",
  },
  {
    id: 2,
    title: "No one reads your policies",
    desc: 'They show up late, cancel last-minute, or "didn\'t know" you require a deposit.',
    src: Img3,
    color: "",
  },
  {
    id: 3,
    title: "You're using someone else's app",
    desc: "You're building reviews and traffic for a platform—not for your own brand.",
    src: Img4,
    color: "",
  },
  {
    id: 4,
    title: "Your site is slow or outdated",
    desc: "On a cracked iPhone with spotty service, your site simply doesn't load fast enough to earn the booking.",
    src: Img5,
    color: "",
  },
  {
    id: 5,
    title: "DMs are out of control",
    desc: '"How much for…?", "Do you have anything Saturday?"—all things your site should answer automatically.',
    src: Img6,
    color: "",
  },
];

export default function ProblemSection() {
  const [activeId, setActiveId] = useState(data[0].id);

  const activeItem = data.find((item) => item.id === activeId) || data[0];

  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.cornerContainer}>
          <div className={styles.corner}>
            <SectionIntroii title='Is this you?' />
          </div>
        </div>
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              <h2 className={`${styles.heading} h2ii`}>
                If your website feels embarrassing, it’s costing you bookings
              </h2>
              <p className={styles.copy}>
                You’re great at what you do. Your chair should be full, your
                books should be calm and predictable. But instead, your online
                experience is… a little messy.
              </p>
            </div>
            <div className={styles.bottom}>
              <div className={styles.left}>
                <div className={styles.mapDataContainer}>
                  {data.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                      <div
                        key={item.id}
                        className={`${styles.card} ${
                          isActive ? styles.activeCard : ""
                        }`}
                        onClick={() => setActiveId(item.id)}
                      >
                        <div className={styles.cardLeft}>
                          <div className={styles.sectionIntro1}>
                            <SectionIntroii
                              title={item.title}
                              color={
                                activeId === item.id ? "white" : item.color
                              }
                            />
                          </div>
                          <div className={styles.sectionIntro2}>
                            <SectionIntroii title={item.title} />
                          </div>

                          <p className={styles.dataItemDesc}>{item.desc}</p>
                        </div>
                        <div className={styles.cardRight}>
                          <div className={styles.imgContainer}>
                            <Image
                              src={item.src}
                              alt='Problem Illustration'
                              fill
                              className={styles.imgii}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.right}>
                <div key={activeId} className={styles.imgContainer}>
                  <Image
                    src={activeItem.src || Img1}
                    alt='Problem Illustration'
                    fill
                    className={`${styles.img} ${styles.fadeIn}`}
                  />
                  <div className={styles.rightOverlay}>
                    <p className={`${styles.dataItemDesc} ${styles.rightDesc}`}>
                      {activeItem.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
