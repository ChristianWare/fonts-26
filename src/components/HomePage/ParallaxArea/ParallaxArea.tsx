"use client";

// import { ReactLenis } from "@studio-freight/react-lenis";
import styles from "./ParallaxArea.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Img1 from "../../../../public/images/WhyWeExist.jpg";
import Img2 from "../../../../public/images/happy.png";
import ParallaxImageLarge from "@/components/shared/ParallaxImageLarge/ParallaxImageLarge";
import Image from "next/image";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

const data = [
  {
    id: 1,
    title: "You want for a site you’re proud of",
  },
  {
    id: 2,
    title: "You're ready to attract more local clients",
  },
  {
    id: 3,
    title: "You're ready to move away from clunky booking apps",
  },
  {
    id: 4,
    title: "You want a website that clearly communicates you",
  },
];

export default function ParallaxArea() {
  return (
    <section className={styles.container}>
      <ParallaxImageLarge src={Img1} alt='Parallax background' />
      <div className={styles.imgOverlay} />
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.contentChildren}>
            <h2 className={styles.heading}>
              Who We&apos;re <br /> perfect for
            </h2>
            <div className={styles.bottom}>
              <div className={styles.left}>
                <p className={styles.copy}>
                  You don’t need a giant agency. You need someone who
                  understands booking.
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.imgContainer}>
                  <Image src={Img2} alt='' fill className={styles.img} />
                </div>
                <div className={styles.sectionIntroContainer}>
                  <SectionIntroii
                    title="We're a good fit if..."
                    color='white'
                  />
                </div>

                <ul className={styles.dataBox}>
                  {data.map((x) => (
                    <li key={x.id} className={styles.title}>
                      <span className={styles.index}>{x.id}</span> {x.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
