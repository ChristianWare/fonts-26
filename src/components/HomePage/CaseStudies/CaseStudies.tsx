"use client";

import { useState, useEffect } from "react";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import styles from "./CaseStudies.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Arrow from "@/components/shared/icons/Arrow/Arrow";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/data";

export default function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNarrow, setIsNarrow] = useState(false);
  const total = projects.length;

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsNarrow(window.innerWidth <= 768);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const orderedProjects = projects.map((_, idx) => {
    const projectIndex = (currentIndex + idx) % total;
    return projects[projectIndex];
  });

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.cornerContainer}>
          <div className={styles.corner}>
            <SectionIntroii title='Projects' />
          </div>
        </div>
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              <h2 className={styles.heading}>Selected Works</h2>
              <p className={styles.copy}>Featured case studies:</p>
              <div className={styles.arrowsContainer}>
                <button
                  type='button'
                  className={styles.arrowButton}
                  onClick={handlePrev}
                  aria-label='Previous project'
                >
                  <Arrow className={styles.arrowLeft} />
                </button>
                <button
                  type='button'
                  className={styles.arrowButton}
                  onClick={handleNext}
                  aria-label='Next project'
                >
                  <Arrow className={styles.arrowRight} />
                </button>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.bottomLeft}></div>
              <div className={styles.bottomRight}>
                {orderedProjects.map((project, index) => {
                  const visibleIndex = Math.min(index, 3);
                  const scaleStep = isNarrow ? 0.08 : 0.12;
                  const offsetStep = isNarrow ? 30 : 80;
                  const scale = 1 - visibleIndex * scaleStep;
                  const offsetX = visibleIndex * offsetStep;
                  const offsetY = 0;
                  const opacity = index > 3 ? 0 : 1;
                  const zIndex = total - index;
                  const isActive = index === 0;

                  return (
                    <div
                      key={project.id}
                      className={styles.projectCard}
                      style={{
                        transform: `translateX(-${offsetX}px) translateY(${offsetY}px) scale(${scale})`,
                        opacity,
                        zIndex,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      <div className={styles.imageWrapper}>
                        <Image
                          src={project.src}
                          alt={project.title}
                          fill
                          className={styles.projectImage}
                        />
                        <div className={styles.imageOverlay} />
                      </div>
                      <div className={styles.projectInfo}>
                        <div className={styles.projectText}>
                          <h3 className={styles.projectTitle}>
                            {project.title}
                          </h3>
                          <p className={styles.projectH1}>{project.h1}</p>
                        </div>
                        <div className={styles.projectCta}>
                          <Link
                            href={`/projects/${project.slug}`}
                            className={styles.projectLink}
                            aria-label={`View case study for ${project.title}`}
                          >
                            <Arrow className={styles.cardArrow} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
