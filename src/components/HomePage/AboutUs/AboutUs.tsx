import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutUs.module.css";
import Marquee from "@/components/shared/Marquee/Marquee";
import Image from "next/image";
import Img1 from "../../../../public/images/thinking.png";

export default function AboutUs() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <h2 className={styles.heading}>
                We build Custom <br /> booking websites
              </h2>
              <p className={styles.copy}>
                We build custom booking websites that allow you to have full
                control over your bookings, reduce reliance on third-party
                platforms, and improve your profit margins. Here are the
                industries we work work with:
                {/* Our mission is to
              empower service-based businesses to thrive online by providing
              tailored solutions that meet their unique needs. */}
              </p>
            </div>
            <div className={styles.topRight}>
              <div className={styles.imgContainer}>
                <Image
                  src={Img1}
                  alt='thinking'
                  fill
                  className={styles.img}
                  priority
                />
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <Marquee />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
