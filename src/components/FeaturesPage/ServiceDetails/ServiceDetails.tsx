import styles from "./ServiceDetails.module.css";
import { featuresSections } from "@/lib/features";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Image from "next/image";
import Img1 from '../../../../public/images/testiii.png'

function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function ServiceDetails() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.right}>
            {featuresSections.map((section) => (
              <div className={styles.card} key={section.id}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTopLeft}>
                    <h3 className={styles.serviceNameHeading}>
                      {humanizeSlug(section.slug)}
                    </h3>
                    <p className={styles.descii}>{section.title}</p>
                    <p className={styles.headline}>{section.intro}</p>
                  </div>

                  <div className={styles.cardTopRight}>
                    <div className={styles.imgContainer}>
                        <Image  src={Img1} alt="Service Image" fill className={styles.img} />
                    </div>
                  </div>
                </div>

                <div className={styles.servicesCard}>
                  <div className={styles.servicesCardTop}>
                    <div className={styles.serviceCardTopA}>
                      {section.items.slice(0, 4).map((item) => (
                        <div key={item.id} className={styles.box}>
                          <div className={styles.serviceName}>{item.title}</div>
                          <p className={styles.descriptionMobile}>
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className={styles.serviceCardTopB}>
                      <div className={styles.serviceCardDots}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                      </div>
                    </div>
                  </div>

                  <div className={styles.servicesCardBottom}>
                    {section.items.slice(0, 4).map((item) => (
                      <p className={styles.description} key={item.id}>
                        {item.desc}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* <div className={styles.finalCta}>
              <h3 className={styles.finalCtaTitle}>{featuresFinalCta.title}</h3>
              <p className={styles.finalCtaBody}>{featuresFinalCta.body}</p>
              <a
                className={styles.finalCtaButton}
                href={featuresFinalCta.primaryCtaHref}
              >
                {featuresFinalCta.primaryCtaLabel}
              </a>
            </div> */}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
