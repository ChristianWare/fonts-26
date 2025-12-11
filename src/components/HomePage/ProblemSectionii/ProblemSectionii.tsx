"use client";

import styles from "./ProblemSectionii.module.css";
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
import Calendar from "@/components/shared/icons/Calendar/Calendar";
import Receipt from "@/components/shared/icons/Receipt/Receipt";
import EyeOff from "@/components/shared/icons/EyeOff/EyeOff";
import Clock from "@/components/shared/icons/Clock/Clock";
import Email from "@/components/shared/icons/Email/Email";

const data = [
  {
    id: 1,
    title: "Clients get lost trying to book",
    desc: "Your booking link is hidden in a menu, buried in your bio, or split across three different pages.",
    src: Img2,
    icon: <Calendar className={styles.icon} />,
  },
  {
    id: 2,
    title: "No one reads your policies",
    desc: 'They show up late, cancel last-minute, or "didn\'t know" you require a deposit.',
    src: Img3,
    icon: <Receipt className={styles.icon} />,
  },
  {
    id: 3,
    title: "You're using someone else's app",
    desc: "You're building reviews and traffic for a platform—not for your own brand.",
    src: Img4,
    icon: <EyeOff className={styles.icon} />,
  },
  {
    id: 4,
    title: "Your site is slow or outdated",
    desc: "On a cracked iPhone with spotty service, your site simply doesn't load fast enough to earn the booking.",
    src: Img5,
    icon: <Clock className={styles.icon} />,
  },
  {
    id: 5,
    title: "DMs are out of control",
    desc: '"How much for…?", "Do you have anything Saturday?"—all things your site should answer automatically.',
    src: Img6,
    icon: <Email className={styles.icon} />,
  },
];

export default function ProblemSectionii() {
  const [activeId, setActiveId] = useState<number>(4);
  const activeItem = data.find((item) => item.id === activeId) ?? data[0];

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
              <h2 className={styles.heading}>
                If your website feels embarrassing, <br /> it’s costing you
                bookings
              </h2>
              <p className={styles.copy}>
                You’re great at what you do. Your chair should be full, your
                books should be calm and predictable. But instead, your online
                experience is… a little messy. Does this sound familiar?
              </p>
            </div>
            <div className={styles.bottom}>
              <div className={styles.q1}>
                <div className={styles.mapDataContainer}>
                  {data.map((item) => (
                    <div key={item.id} className={styles.card}>
                      <h3
                        className={`${styles.title} ${
                          activeId === item.id ? styles.titleActive : ""
                        }`}
                        onClick={() => setActiveId(item.id)}
                      >
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.q2}>
                <div className={styles.q2Top}>
                  <div className={styles.iconContainer}>{activeItem.icon}</div>
                  <div className={styles.imgContainerMobile}>
                    <Image
                      src={activeItem.src ?? Img1}
                      alt='Problem Image'
                      fill
                      className={styles.img}
                    />
                  </div>
                </div>
                <div className={styles.q2Bottom}>
                  <h4 className={`${styles.subheading} subheadingii`}>
                    {activeItem.title}
                  </h4>
                  <p className={styles.desc}>{activeItem.desc}</p>
                </div>
              </div>
              <div className={styles.q3}>
                <div className={styles.imgContainer}>
                  <Image
                    src={activeItem.src}
                    alt='Problem Image'
                    fill
                    className={styles.img}
                  />
                </div>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
