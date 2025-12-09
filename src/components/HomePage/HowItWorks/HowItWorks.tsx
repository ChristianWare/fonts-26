"use client";

import styles from "./HowItWorks.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import { process } from "@/lib/data";
import IndustriesIllustration from "../../../../public/illustrations/chessIllustration.png";
import Image from "next/image";

export default function HowItWorks() {
  return (
    <div className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.leftContent}>
              <div className={styles.SectionIntroContainer}>
                <SectionIntroii title='How It works' />
              </div>
              <h2 className={styles.heading}>How we work together</h2>
              <p className={styles.copy}>
                A simple, guided process to go from “I hate my site” to “I’m
                proud to send clients here.”
              </p>
              <div className={styles.imgContainer}>
                <Image
                  src={IndustriesIllustration}
                  alt='Service Illustration'
                  fill
                  className={styles.img}
                  priority
                />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.mapDataBox}>
              {process.map((item) => (
                <div key={item.id} className={styles.card}>
                  <strong className={styles.title}>{item.title}</strong>
                  <p className={styles.desc}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
