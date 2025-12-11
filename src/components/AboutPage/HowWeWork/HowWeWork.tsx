import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./HowWeWork.module.css";
import Image from "next/image";
import Illustration from "../../../../public/illustrations/launchIllustration.png";
import Img1 from "../../../../public/images/whydb.jpg";
import Button from "@/components/shared/Button/Button";
import Check from "@/components/shared/icons/Check/Check";

const data = [
  {
    id: 1,
    title: "Audit → Plan",
    desc: "We map services/vehicles, pricing, deposits, buffers, and policies. You get a punch-list, wireframe, and quick wins.",
    icons: <Check className={styles.icon} />,
  },
  {
    id: 2,
    title: "Build the flow",
    desc: "We design the site and wire in Stripe (Apple/Google Pay), Twilio (SMS/email), and Google/iCal. Add-ons, travel time, distance fees—set correctly.",
    icons: <Check className={styles.icon} />,
  },
  {
    id: 3,
    title: "Launch + tune",
    desc: "Ship, connect domain, watch live numbers (completion, show-up rate, payment share). Then iterate.",
    icons: <Check className={styles.icon} />,
  },
];

export default function HowWeWork() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imgContaineri}>
              <Image
                src={Illustration}
                fill
                alt='Launch Illustration'
                title='Launch Illustration'
                className={styles.illustration}
              />
            </div>
            <div className={styles.imgContainerii}>
              <Image
                src={Img1}
                fill
                alt='Why DB'
                title='Why DB'
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.rightTop}>
              <h2 className={styles.heading}>
                Our process for <br />
                completing every project
              </h2>
              <div className={styles.btnContainer}>
                <Button
                  href='/contact'
                  btnType='black'
                  text='Book your discovery call'
                />
              </div>
            </div>
            <div className={styles.rightBottom}>
              <div className={styles.mapDataContainer}>
                {data.map((item) => (
                  <div key={item.id} className={styles.card}>
                    <div className={styles.cardTop}>
                      {item.icons}
                      <h3 className={styles.title}>{item.title}</h3>
                    </div>
                    <p className={styles.desc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
