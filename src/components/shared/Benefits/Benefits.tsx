import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Benefits.module.css";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Image from "next/image";
import AboutIllustration from "../../../../public/illustrations/aboutIllustration.png";

const data = [
  {
    id: 1,
    title: "Fast, reliable delivery",
    Description: "Deadlines met, launches smooth.",
  },
  {
    id: 2,
    title: "Clear, no-surprise pricing",
    Description: "Flat, transparent scope.",
  },
  {
    id: 3,
    title: "Everything under one roof",
    Description: "Strategy, UX, build, and integrations.",
  },
  {
    id: 4,
    title: "Fixed milestones",
    Description: "Weekly checkpoints with visible progress.",
  },
];

export default function Benefits() {
  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <LayoutWrapper>
          <div className={styles.inner}>
            <div className={styles.top}>
              <div className={styles.imgContainer}>
                <Image
                  src={AboutIllustration}
                  alt=''
                  fill
                  className={styles.img}
                />
              </div>
              <SectionIntroii title='Benefits' />
              <h2 className={styles.heading}>
                Why work with <br />
                <span className={styles.span}>Fonts & Footers?</span>
              </h2>
              <p className={styles.copy}>
                Partnering with Fonts & Footers means gaining a dedicated team
                focused on delivering quality, transparency, and
                efficiency—helping your business achieve its goals with
                confidence and ease.
              </p>
            </div>

            <div className={styles.bottom}>
              <div className={styles.mapBox}>
                {data.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.cardContent}>
                      <h3 className={styles.title}>{item.title}</h3>
                      <p className={styles.desc}>{item.Description}</p>
                    </div>
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
