import styles from "./Believe.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/whydb.jpg";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

export default function Believe() {
  return (
    <section className={styles.parent}>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.imgOverlay} />
          <Image
            src={Img1}
            alt='Hero Image'
            fill
            className={styles.img}
            quality={100}
          />
          <div className={styles.content}>
            <SectionIntroii title='What we believe' color='tan' />
            <h2 className={styles.heading}>What we believe</h2>
            <p className={styles.copy}>
              Simplicity beats persuasion. Your clients aren&apos;t
              reading—they&apos;re finishing a task on their phone. Friction is
              expensive. Every extra field or surprise fee lowers completion.
              Own your platform. Your Stripe, your Twilio, your CMS, your data.
              Clarity wins. Policies near the button prevent support tickets.
              Outcomes over aesthetics. Beauty is required; bookings are the
              goal. Quality over quantity. Five warm leads beat eighty cold
              business cards—online or off.
            </p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
