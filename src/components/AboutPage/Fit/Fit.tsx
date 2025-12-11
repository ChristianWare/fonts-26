import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Fit.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/vacation.jpg";
import Check from "@/components/shared/icons/Check/Check";

const process = [
  {
    id: 1,
    title: "Project Discovery",
    desc: "Focused conversations and light research to understand your services, audience, and goals—then define simple success metrics to guide the build.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
  {
    id: 2,
    title: "Strategy & Creative Direction",
    desc: "We turn insights into a clear plan: refine your offer, name straightforward options, and outline the few easy steps clients take to book.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
  {
    id: 3,
    title: "",
    desc: "",
    src: Img1,
    icon: "",
    btn: false,
  },
  {
    id: 4,
    title: "",
    desc: "Prefer proof first? Start with a 14-Day Pilot Page—one high-intent flow running alongside your current system. If you continue, 100% of the pilot fee credits to your build.",
    src: "",
    icon: "",
    btn: false,
  },
  {
    id: 5,
    title: "Design & Project Build",
    desc: "We craft an on-brand website and a smooth one-screen booking flow (service → pro → time → pay), built with precision, accessibility, and attention to detail.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
  {
    id: 6,
    title: "Launch & Handoff",
    desc: "We go live with a calm, confidence-building experience and show your team exactly how to manage bookings day-to-day.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
];

export default function Fit() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              How we’ll <br /> work together
            </h2>
          </div>
          <div className={styles.bottom}>
            <div className={styles.mapDataContainer}>
              {process.map((item, index) => (
                <div key={index} className={styles.card}>
                  {item.icon}
                  {item.title && <h3 className={styles.title}>{item.title}</h3>}
                  {item.desc && <p className={styles.desc}>{item.desc}</p>}
                  {item.src && (
                    <div className={styles.imgContainer}>
                      <Image
                        src={item.src}
                        alt='Process Image'
                        fill
                        className={styles.img}
                      />
                    </div>
                  )}
                  {item.btn && (
                    <div className={styles.btnContainer}>
                      <strong className={styles.strong}>Learn More ＞</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
