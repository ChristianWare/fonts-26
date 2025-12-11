import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Different.module.css";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Image from "next/image";
import IMg2 from "../../../../public/images/happyiii.png";
import Calendar from "@/components/shared/icons/Calendar/Calendar";

const data = [
  {
    id: 1,
    title: "“Text to book only” (no deposits or automation)",
    desc: "If you insist on manual texting, DMs, or calls with no deposit or reminders, our system won’t have room to lift completion or reduce no-shows.",
    icon: <Calendar className={styles.icon} />,
  },
  {
    id: 2,
    title: "Custom features without a conversion goal",
    desc: "If the feature can’t be tied to completion rate, show-up rate, AOV, or ops efficiency, it’s probably scope creep—not progress.",
    icon: <Calendar className={styles.icon} />,
  },
  {
    id: 3,
    title: "Build-and-forget (no plan to measure or iterate)",
    desc: "If you don’t want dashboards, tests, or a 30-day tune-up, we’re not aligned. We optimize live numbers, not opinions.",
    icon: <Calendar className={styles.icon} />,
  },
  {
    id: 4,
    title: "No clear policies",
    desc: "Refusing to publish plain-English deposit, reschedule, and late policies creates friction and support tickets we can’t design around.",
    icon: <Calendar className={styles.icon} />,
  },
  {
    id: 5,
    title: "Price-only shoppers",
    desc: "If the goal is the cheapest site rather than the highest booking completion, a template mill will serve you better than we will.",
    icon: <Calendar className={styles.icon} />,
  },
];

export default function Different() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.imgContaineriii}>
              <Image
                src={IMg2}
                alt='Owner comparing chaotic texting with a clean, automated booking flow'
                fill
                className={styles.img}
              />
            </div>
            <SectionIntroii title="Who we're not a fit for" />
            <h2 className={styles.heading}>
              We’re candid about fit <br /> so your project succeeds
            </h2>
            <p className={styles.intro}>
              Fonts &amp; Footers is built to maximize completed bookings and
              operational clarity. If any of the points below describe your
              current plan, we’ll happily point you to a better-suited option.
            </p>
          </div>

          <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {data.map((item) => (
                <div key={item.id} className={styles.card}>
                  <div className={styles.cardTop}>
                    <div className={styles.iconBox}>{item.icon}</div>
                    <strong className={styles.title}>{item.title}</strong>
                  </div>
                  <div className={styles.cardBottom}>
                    <p className={styles.desc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.bottomRight}>
              <div className={styles.note}>
                <p className={styles.noteHeading}>If you’re on the fence…</p>
                <p className={styles.noteCopy}>
                  Try our <strong>14-Day Pilot Page</strong>. It runs alongside
                  your current system and proves lift in completion and show-up
                  rates—before any full build. 100% of the pilot fee credits to
                  your project if you continue.
                </p>
              </div>

              <div className={styles.imgContainerii}>
                <Image
                  src={IMg2}
                  alt='Happy client reviewing booking analytics after launching deposit-first checkout'
                  fill
                  className={styles.img}
                />
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
