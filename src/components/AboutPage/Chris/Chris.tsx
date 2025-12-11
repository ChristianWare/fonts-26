import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import styles from "./Chris.module.css";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import ChrisImg from "../../../../public/images/chris.png";

export default function Chris() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.circleContainer}>
              <div className={styles.pulsingCircles} />
              <div className={styles.imgContainer}>
                <Image src={ChrisImg} alt='' fill className={styles.img} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>
              A quick hello — <br />
              from the owner
            </h2>
            <p className={styles.copy}>
            I&apos;m Chris, the person behind Fonts & Footers. I built this because I kept seeing talented local businesses—trainers, stylists, drivers, small teams—whose online presence didn&apos;t match the quality of their actual work, not because they didn&apos;t care, but because they were too busy doing the job. My goal is simple: give you a website and booking system that feels as professional as the service you deliver in person, so the right people can find you and book you directly without the chaos.
            </p>
            <SectionIntroii title='Chris - Founder of Fonts & Footers' />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
