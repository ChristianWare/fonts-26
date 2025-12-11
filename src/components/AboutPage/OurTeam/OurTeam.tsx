// import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./OurTeam.module.css";
import Image, { StaticImageData } from "next/image";

import SectionIntro from "@/components/shared/SectionIntro/SectionIntro";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

interface Props {
  backgroundColor?: string;
  textColor?: string;
  text: string;
  src: StaticImageData;
  signatureBox?: boolean;
}

export default function OurTeam({
  backgroundColor = "",
  textColor = "",
  text,
  src,
  signatureBox,
}: Props) {
  return (
    <section className={`${styles.container} ${styles[backgroundColor]}`}>
      {/* <LayoutWrapper> */}
        <div className={styles.content}>
          <SectionIntroii title='From Founder' color={textColor} />
          <h2 className={`${styles.heading} ${styles[textColor]}`}>
            &ldquo;{text}&rdquo;
          </h2>
          <div className={styles.imgContainer}>
            <Image src={src} alt='' className={styles.img} />
          </div>
          {/* <p className={styles.copy}>
              When you’re growing, you don’t need another pretty website. You
              need a partner who cares about filled calendars, fewer no-shows,
              and clear next steps. I’m Chris, founder of Fonts & Footers. Our
              niche is sharp: direct-booking websites that move visitors to paid
              appointments—fast. We track what matters—completion rate, show
              rate, prepaid %, rebooking, membership mix, and LTV/CAC—so you
              keep the relationship and the margin.
            </p>1 */}
          {signatureBox && (
            <div className={styles.signatureBox}>
              <SectionIntro title='Chris - Founder of Fonts & Footers' />
            </div>
          )}
        </div>
      {/* </LayoutWrapper> */}
    </section>
  );
}
