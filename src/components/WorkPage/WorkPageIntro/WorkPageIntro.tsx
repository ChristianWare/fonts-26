import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./WorkPageIntro.module.css";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Image from "next/image";
import Img1 from "../../../../public/images/plants.png";

export default function WorkPageIntro() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <SectionIntroii title='Our Work' color='tan' />
          <h1 className={styles.heading}>
            Proof that booking can be <br /> beautiful—and profitable
          </h1>
          <p className={`${styles.copy} subheading`}>
            A few favorites and demos to show what a one-screen flow + deposit
            strategy can do.
          </p>
          <div className={styles.imgContainer}>
            <Image src={Img1} alt='thinking' fill className={styles.img} />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
