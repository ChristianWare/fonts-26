/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ComparisonChart.module.css";
import { pricingData } from "@/lib/data";
import Check from "@/components/icons/Check/Check";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

type Plan = (typeof pricingData)[number];
type PlanName = Plan["service"];

const cumulativeFeatureStart: Partial<Record<string, PlanName>> = {
  "Single-resource calendar": "Solo",
  "Stripe deposit checkout": "Solo",
  "SMS / email reminders": "Solo",
  "Guest reschedule link": "Solo",
  "Multi-staff calendar": "Team",
  "Google / 365 sync": "Team",
  "Upsell add-ons": "Team",
  "Role-based access": "Team",
};

export default function ComparisonChart() {
  const plans = pricingData;

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const planIndexByName = new Map<PlanName, number>(
    plans.map((p, i) => [p.service, i] as const)
  );
  const defaultFeatured = Math.max(
    0,
    plans.findIndex((p) => p.service === "Team")
  );
  const [selected, setSelected] = useState(defaultFeatured);

  const allFeatures = Array.from(
    new Set(
      plans.flatMap((p) => p.servicesInclude.map((s) => s.serviceName.trim()))
    )
  );

  const rawHasFeature = new Map<PlanName, Set<string>>();
  for (const p of plans) {
    rawHasFeature.set(
      p.service,
      new Set(p.servicesInclude.map((s) => s.serviceName.trim()))
    );
  }

  function included(planName: PlanName, feature: string) {
    // Removed check for "Custom" since it's not a valid PlanName
    const startPlan = cumulativeFeatureStart[feature];
    if (startPlan) {
      const startIdx = planIndexByName.get(startPlan) ?? 0;
      const planIdx = planIndexByName.get(planName) ?? 0;
      return planIdx >= startIdx;
    }
    return rawHasFeature.get(planName)?.has(feature) ?? false;
  }

  const featureDesc = new Map<string, string>();
  for (const feat of allFeatures) {
    for (const p of plans) {
      const found = p.servicesInclude.find(
        (s) => s.serviceName.trim() === feat
      );
      if (found?.description) {
        featureDesc.set(feat, found.description);
        break;
      }
    }
  }

  const plansToRender = isMobile ? [plans[selected]] : plans;

  return (
    <div className={styles.container} id="compare">
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.copy}>
            <SectionIntroii title='No contracts, cancel whenever you want.' />
          </div>
          <h2 className={styles.heading}>Compare Plans</h2>
          <div className={styles.mobileTabs}>
            {plans.map((p, i) => (
              <button
                key={p.id}
                type='button'
                onClick={() => setSelected(i)}
                className={`${styles.tab} ${i === selected ? styles.activeTab : ""}`}
              >
                {p.service}
              </button>
            ))}
          </div>

          <div
            className={styles.grid}
            style={{ ["--plan-count" as any]: plansToRender.length }}
          >
            <div className={`${styles.row} ${styles.headerRow}`}>
              <div
                className={`${styles.cell} ${styles.headerCell} ${styles.featureColHead} ${styles.cornerCell}`}
              >
                Plan Name
              </div>
              {plansToRender.map((p, i) => {
                const isFeatured = p.service.toLowerCase() === "team";
                return (
                  <div
                    key={p.id}
                    className={`${styles.cell} ${styles.headerCell} ${styles.planHead} ${isFeatured ? styles.featured : ""} ${i === plansToRender.length - 1 ? styles.lastHeaderCell : ""}`}
                  >
                    <div className={styles.planHeadTop}>
                      <h3 className={styles.planName}>{p.service}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`${styles.row} ${styles.headerRowii}`}>
              <div
                className={`${styles.cell} ${styles.headerCell} ${styles.featureColHead} ${styles.cornerCell}`}
              >
                {/* Price */}
                <span className={styles.featureName}>Price</span>
              </div>
              {plansToRender.map((p, i) => {
                const isFeatured = p.service.toLowerCase() === "team";
                return (
                  <div
                    key={p.id}
                    className={`${styles.cell} ${styles.headerCell} ${styles.planHead} ${isFeatured ? styles.featured : ""} ${i === plansToRender.length - 1 ? styles.lastHeaderCell : ""}`}
                  >
                    <div className={styles.planHeadTop}>
                      <h3 className={styles.planNameii}>{p.price}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            {allFeatures.map((feat) => (
              <div key={feat} className={styles.row}>
                <div className={`${styles.cell} ${styles.featureCol}`}>
                  <span className={styles.featureName}>{feat}</span>
                  {featureDesc.get(feat) && (
                    <span className={styles.featureInfo}>
                      {featureDesc.get(feat)}
                    </span>
                  )}
                </div>
                {plansToRender.map((p) => {
                  const hasIt = included(p.service, feat);
                  const isFeatured = p.service.toLowerCase() === "team";
                  return (
                    <div
                      key={`${p.id}-${feat}`}
                      className={`${styles.cell} ${styles.valueCell} ${isFeatured ? styles.featured : ""}`}
                      aria-label={`${p.service} ${hasIt ? "includes" : "does not include"} ${feat}`}
                    >
                      {hasIt ? (
                        <span className={styles.valueYes}>
                          <Check className={styles.icon} />
                        </span>
                      ) : (
                        <span className={styles.valueNo}>—</span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
