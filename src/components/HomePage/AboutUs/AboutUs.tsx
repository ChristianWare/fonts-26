import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutUs.module.css";
import Marquee from "@/components/shared/Marquee/Marquee";

export default function AboutUs() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              About <br /> Fonts & Footers
            </h2>
            <p className={styles.copy}>
              We build custom booking websites that allow you to have full
              control over your bookings, reduce reliance on third-party
              platforms, and improve your profit margins. Our mission is to
              empower service-based businesses to thrive online by providing
              tailored solutions that meet their unique needs. Here are the
              industries we work work with:
            </p>
          </div>
          <div className={styles.bottom}>
            <Marquee />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
