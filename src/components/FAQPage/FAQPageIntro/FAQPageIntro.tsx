import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./FAQPageIntro.module.css";
import FAQMenu from "../FAQMenu/FAQMenu";
import Image from "next/image";
import Img1 from "../../../../public/illustrations/ponderIllustrationii.png";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

export default function FAQPageIntro() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.imgContainer}>
            <Image src={Img1} fill alt='FAQ' className={styles.img} />
          </div>
          <SectionIntroii title="All FAQ's" />
          <h1 className={styles.heading}>Frequently Asked Questions</h1>
          <p className={styles.copy}>
            Find answers to the most common questions about our services.
          </p>
          <FAQMenu />
        </div>
      </LayoutWrapper>
    </section>
  );
}
