import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import styles from "./Chris.module.css";
import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import ChrisImg from "../../../../public/images/chris.png";

export default function Chris() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.circleContainer}>
              <div className={styles.pulsingCircles} />
              <div className={styles.imgContainer}>
                <Image src={ChrisImg} alt='' fill className={styles.img} />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <h2 className={styles.heading}>
              A quick hello — <br />
              from the owner
            </h2>
            <p className={styles.copy}>
              Hi, I’m Chris—founder, builder, and the guy who won’t stop
              tweaking your checkout until people actually finish it. I didn’t
              set out to “do web.” I set out to fix the moment where service
              businesses lose money—the second someone tries to book and hits
              friction.
              {/* Along the way I wore a lot of hats: designer, dev, ops,
              accidental therapist for owners juggling calendars and cash flow.
              I built my own booking stack the hard way (Next.js, Stripe,
              Twilio, Prisma, Postgres), stress-tested it with real clients, and
              learned what actually moves the needle.  */}
              {/* When I started this journey, my vision was simple. I wanted to
              create something that brings value, fosters connection, and makes
              a meaningful impact. Every step we’ve taken has been guided by a
              passion for innovation and a commitment to putting people first.
                 This is not just a brand. It is a community, a space where
              ideas grow, challenges are met with creativity, and every voice
              matters. None of this would be possible without your support,
              trust, and belief in what we stand for.   Thank you for being a
              part of this story. Together, we are building something truly
              special, and I can’t wait to see what the future holds. */}
            </p>
            <SectionIntroii title='Chris - Founder of Fonts & Footers' />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
