import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>About Us</h2>
            <p className={styles.copy}>
              We build custom booking websites that allow you to have full
              control over your bookings, reduce reliance on third-party
              platforms, and improve your profit margins.
            </p>
          </div>
          <div className={styles.bottom}>
            
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
