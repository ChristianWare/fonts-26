import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./Fit.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/vacation.jpg";
import Check from "@/components/shared/icons/Check/Check";
import ScaleIllustration from "../../../../public/illustrations/scaleIllustration.png";

// import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

const process = [
  {
    id: 1,
    title: "Listen first",
    desc: "We start with a quick call to understand how your business runs, which services matter most, and where the pain points are.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
  {
    id: 2,
    title: "Design the booking experience",
    desc: "We map out a clear path from discovery to booking that fits your business, and you'll see a preview before anything goes live.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
  {
    id: 2.1,
    title: "",
    desc: "",
    src: Img1,
    icon: "",
    btn: false,
  },
  {
    id: "",
    title: "",
    desc: "",
    src: "",
    icon: "",
    btn: false,
  },
  {
    id: 3,
    title: "Build, connect, and launch",
    desc: "We build your site on a modern stack, connect your booking and payment tools, set up local SEO, and deliver on a concrete launch date.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
  {
    id: 4,
    title: "Support and refine",
    desc: "After launch, we offer a monthly plan so you can update services, adjust policies, and make improvements as your business evolves.",
    src: "",
    icon: <Check className={styles.icon} />,
    btn: true,
  },
];

export default function Fit() {
  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              {/* <SectionIntroii title='Process' /> */}
              <h2 className={styles.heading}>
                How we’ll <br /> work together
              </h2>
              <p className={styles.copy}>
                We keep the process simple and human.
              </p>
            </div>
            <div className={styles.bottom}>
              <div className={styles.mapDataContainer}>
                {process.map((item, index) => (
                  <div key={index} className={styles.card}>
                    {item.id && !item.src && (
                      <span className={styles.id}>{item.id}</span>
                    )}
                    {item.title && (
                      <h3 className={`${styles.title}`}>{item.title}</h3>
                    )}
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
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.illustrationContainer}>
              <Image
                src={ScaleIllustration}
                alt=''
                fill
                className={styles.illustration}
              />
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
