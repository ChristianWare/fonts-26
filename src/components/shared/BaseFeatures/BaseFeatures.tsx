import styles from "./BaseFeatures.module.css";
import Arrow from "../icons/Arrow/Arrow";
import Button from "../Button/Button";
import SectionIntro from "../SectionIntro/SectionIntro";
import Design from "../icons/Design/Design";
import Payment from "../icons/Payment/Payment";
import Clock from "../icons/Clock/Clock";
import Integration from "../icons/Integration/Integration";
import Multiple from "../icons/Multiple/Multiple";
import Hosting from "../icons/Hosting/Hosting";
import Money from "../icons/Money/Money";
import Stariii from "../icons/Stariii/Stariii";
import Analytics from "../icons/Analytics/Analytics";
import Edit from "../icons/Edit/Edit";
import Image from "next/image";

import Img2 from "../../../../public/images/work.png";

type Feature = {
  icon: React.ReactNode;
  title: string;
};

const pagesData = [
  { id: 1, title: "Home" },
  { id: 2, title: "About" },
  { id: 3, title: "Services" },
  { id: 4, title: "Contact" },
  { id: 5, title: "Legal Information" },
  { id: 6, title: "404" },
];

const featureData: Feature[] = [
  {
    icon: <Design className={styles.icon} />,
    title: "One-screen booking tool",
  },
  {
    icon: <Payment className={styles.icon} />,
    title: "Payment Processing",
  },
  {
    icon: <Clock className={styles.icon} />,
    title: "Automated SMS/email reminders",
  },
  {
    icon: <Integration className={styles.icon} />,
    title: "SEO & GEO Strategy",
  },
  {
    icon: <Multiple className={styles.icon} />,
    title: "Multi-staff Management",
  },
  {
    icon: <Hosting className={styles.icon} />,
    title: "Blog & News",
  },
  {
    icon: <Money className={styles.icon} />,
    title: "Dynamic Pricing",
  },
  {
    icon: <Stariii className={styles.icon} />,
    title: "Reviews",
  },
  {
    icon: <Analytics className={styles.icon} />,
    title: "Analytics",
  },
  {
    icon: <Edit className={styles.icon} />,
    title: "Unlimted Revisions",
  },
];

export default function BaseFeatures() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <div className={styles.imgContainer}>
              <Image src={Img2} alt='' fill className={styles.img} />
            </div>
            <h2 className={styles.heading}>
              What&apos;s <span className='span1'>included</span> <br /> in{" "}
              <span className='span2'>every</span> website we build
            </h2>
          </div>
          <div className={styles.topRight}>
            <p className={styles.copy}>
              We start from a basic structure and then we add the
              functionalities that are used for your business. You keep control
              of your site and your budget.
            </p>
            <div className={styles.btnContainer}>
              <Button
                href='/contact'
                btnType='black'
                text="Let's figure out what you really need"
              />
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.one}>
            <SectionIntro title='Base pages' />
            <div className={styles.mapDataContainer}>
              {pagesData.map((page) => (
                <div key={page.id} className={styles.card}>
                  <div className={styles.title}>
                    <Arrow className={styles.arrow} /> {page.title}
                  </div>
                </div>
              ))}
            </div>
            <p className={styles.copyii}>
              These are the essential pages that every website needs to have.
              They provide the basic information about your business and help
              visitors navigate your site. We do this with a custom design
              website that matches your brand identity.
            </p>
          </div>
          <div className={styles.twoThree}>
            {featureData.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                {feature.icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
