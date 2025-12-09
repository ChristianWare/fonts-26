"use client";

// import { ReactLenis } from "@studio-freight/react-lenis";
import styles from "./ParallaxArea.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Img1 from "../../../../public/images/WhyWeExist.jpg";
import ParallaxImageLarge from "@/components/shared/ParallaxImageLarge/ParallaxImageLarge";
const data = [
  {
    id: 1,
    title: "High Quality Products",
  },
  {
    id: 2,
    title: "Individual Advice",
  },
  {
    id: 3,
    title: "Professional Assembly",
  },
  {
    id: 4,
    title: "Uncomplicated Shipping",
  },
  {
    id: 5,
    title: "Persoanl Service",
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
              Blazing fast <br /> online stores
            </h2>
            <div className={styles.bottom}>
              <div className={styles.left}>
                <p className={styles.copy}>
                  With our passion and enthusiasm for cycling, we offer high
                  quality and exceptional bikes for riders of all levels.
                </p>
              </div>
              <div className={styles.right}>
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
