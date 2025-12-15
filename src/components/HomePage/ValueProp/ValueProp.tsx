import styles from "./ValueProp.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Bell from "@/components/shared/icons/Bell/Bell";
import Receipt from "@/components/shared/icons/Receipt/Receipt";
import Clock from "@/components/shared/icons/Clock/Clock";
import Seo from "@/components/shared/icons/Seo/Seo";
import BaseFeatures from "@/components/shared/BaseFeatures/BaseFeatures";
import Image from "next/image";
import Img1 from "../../../../public/images/specialize.png";

const data = [
  {
    id: 1,
    title: "Clear services, clear prices",
    desc: "Clients see exactly what you offer, what it costs, and how long it takes—so they can choose the right service without blowing up your DMs.",
    icon: <Seo className={styles.icon} />,
  },
  {
    id: 2,
    title: "Booking flow in under 60 seconds",
    desc: "From your Google listing or Instagram bio to confirmed appointment in a few taps. Fewer drop-offs. Less friction. More bookings.",
    icon: <Clock className={styles.icon} />,
  },
  {
    id: 3,
    title: "Policies that actually stick",
    desc: 'Deposits, cancellation rules, late fees, and prep instructions are woven into the flow—so "I didn\'t know" stops being an excuse.',
    icon: <Receipt className={styles.icon} />,
  },
  {
    id: 4,
    title: "Automated reminders & follow-ups",
    desc: "Send confirmations, prep instructions, and post-appointment thank-yous automatically—so you stay top of mind without lifting a finger.",
    icon: <Bell className={styles.icon} />,
  },
];

export default function ValueProp() {
  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.topLeft}>
                <div className={styles.sectionIntroContainer}>
                  <SectionIntroii title='What we do' />
                </div>
                <h2 className={styles.heading}>
                  We turn confused clickers into confident booked clients
                </h2>
                <p className={styles.copy}>
                  Fonts & Footers designs and builds direct-booking websites
                  tailored for salons and service studios. No templates, no
                  “one-size-fits-all” theme store vibe—just one clean path from
                  “found you” to “see you in the chair.”
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
              <div className={styles.mapDataContainer}>
                {data.map((x) => (
                  <div key={x.id} className={styles.card}>
                    <div className={styles.cardTop}>
                      <span className={styles.id}>{x.id}</span>
                      <h3 className={styles.title}>{x.title}</h3>
                      <p className={styles.desc}>{x.desc}</p>
                    </div>
                    <div className={styles.cardBottom}>{x.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <BaseFeatures />
        </LayoutWrapper>
      </div>
    </section>
  );
}
