import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ValueProp.module.css";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Bell from "@/components/shared/icons/Bell/Bell";
import Receipt from "@/components/shared/icons/Receipt/Receipt";
import Clock from "@/components/shared/icons/Clock/Clock";
import Seo from "@/components/shared/icons/Seo/Seo";

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
        <div className={styles.cornerContainer}>
          <div className={styles.corner}>
            <SectionIntroii title='What we do' />
          </div>
        </div>
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
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
        </LayoutWrapper>
      </div>
    </section>
  );
}
