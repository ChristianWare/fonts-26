import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Approach.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/approach.jpg";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

export default function Approach() {
  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.cornerContainer}>
          <div className={styles.corner}>
            <SectionIntroii title='About' />
          </div>
        </div>{" "}
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.imgContainer}>
                <Image
                  src={Img1}
                  fill
                  alt='approach image'
                  title='approach image'
                  className={styles.img}
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.rightTop}>
                <h2 className={`${styles.heading} h3`}>
                  What <br />
                  <span className={styles.span}>Fonts & Footers</span> <br />
                  Is all about
                </h2>
                <p className={styles.copy}>
                  Fonts & Footers is a small, focused web studio that builds
                  direct-booking websites for owner-led service businesses.
                  We’re not a generic “we do everything” agency. We specialize
                  in one thing:
                </p>
                <p className={`${styles.subheading} subheading`}>
                  Turning confused visitors into confident, booked clients.
                </p>
              </div>
              <div className={styles.rightBottom}>
                <div className={styles.box}></div>
                <p className={styles.copyii}>
                  We do that by combining clean design, fast tech, and an
                  obsessive focus on how real people actually book rides,
                  appointments, and sessions on their phones.
                </p>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
