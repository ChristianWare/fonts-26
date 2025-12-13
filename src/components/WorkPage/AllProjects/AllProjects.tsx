"use client";

import Image from "next/image";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./AllProjects.module.css";
import { projects } from "@/lib/data";
import Link from "next/link";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import SectionIntro from "@/components/shared/SectionIntro/SectionIntro";

export default function AllProjects() {
  return (
    <section className={styles.containerParent}>
      <LayoutWrapper>
        <div className={styles.container}>
          <div className={styles.mapDataContainer}>
            {projects
              .slice()
              .reverse()
              .map((item, i) => (
                <Link
                  href={`/work/${item.slug}`}
                  key={`${item.id}-${i}`}
                  className={`${styles.card} card`}
                >
                  <div className={styles.sectionIntro}>
                    <SectionIntro title={item.title} color='tan' />
                  </div>

                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className={styles.img}
                    // priority={i === index}
                    sizes='(max-width: 1200px) 90vw, 1200px'
                  />
                  <div className={styles.imgOverlay} />
                  <div className={styles.textLayer}>
                    <SectionIntroii title={item.title} color='tan' />

                    <h3 className={styles.feature}>
                      &ldquo;{item.testimonial}&rdquo;
                    </h3>
                    <div className={styles.cardBottom}>
                      <div className={styles.smallContainer}>
                        <small>— {item.owner}</small>
                        <small className={styles.smallTitle}>
                          Founder of {item.title}
                        </small>
                      </div>
                      <div className={styles.btnContainer}>
                        <div className={styles.caseStudyBtn}>
                          View case study <Arrow className={styles.arrowii} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
