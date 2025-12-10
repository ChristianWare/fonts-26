"use client";

import styles from "./ServiceDetails.module.css";
import { pricingData } from "@/lib/data";
import Button from "@/components/shared/Button/Button";
import { usePathname } from "next/navigation";

type Plan = "SOLO" | "TEAM" | "RENTAL_FLEET" | "MULTI_LOCATION" | "CUSTOM";

function serviceToPlan(service: string): Plan {
  switch (service) {
    case "Solo":
      return "SOLO";
    case "Team":
      return "TEAM";
    case "Rental/Fleet":
      return "RENTAL_FLEET";
    case "Multi-Location":
      return "MULTI_LOCATION";
    case "Custom":
      return "CUSTOM";
    default:
      return "SOLO";
  }
}

function toAnchorId(label: string) {
  // lower-case, replace any non a–z/0–9 with hyphens, collapse repeats, trim
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ServiceDetails() {
  const pathname = usePathname();
  const isPricingPage = pathname === "/pricing";

  const data = isPricingPage ? pricingData : pricingData.slice(0, 3);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.right}>
          {data.map((x) => {
            const anchorId = toAnchorId(x.service);
            const plan = serviceToPlan(x.service);
            // const btnColor = x.btnColor;
            // Where the button goes:
            const href = isPricingPage
              ? `/account/upgrade?plan=${plan}` // Subscribe path
              : `/pricing#${anchorId}`; // Learn more path

            const btnText = isPricingPage ? "Subscribe" : "Learn More";

            return (
              <div className={styles.card} key={x.id} id={anchorId}>
                <div className={styles.cardTop}>
                  <div className={styles.cardTopLeft}>
                    <h3 className={`${styles.serviceNameHeading} subheading`}>
                      {x.service} Booking Website
                    </h3>
                    <p className={styles.headline}>{x.desc}</p>
                  </div>
                  <h3 className={styles.price}>{x.price}</h3>
                  <p className={styles.headline}>Pause or cancel any time</p>

                  <div className={styles.cardTopRight}>
                    <div className={styles.btnContainer}>
                      <Button href={href} btnType='lightGray' text={btnText} />
                    </div>
                  </div>
                </div>

                <div className={styles.servicesCard}>
                  <div className={styles.servicesCardTop}>
                    <div className={styles.serviceCardTopA}>
                      {x.servicesInclude.map((y) => (
                        <div key={y.serviceName} className={styles.box}>
                          <h4 className={styles.serviceName}>
                            <span className={styles.check}>✓</span>
                            {y.serviceName}
                          </h4>
                        </div>
                      ))}
                    </div>
                    {/* <div className={styles.serviceCardTopB}>
                      <div className={styles.serviceCardDots}>
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                        <span className={styles.dot} />
                      </div>
                    </div> */}
                    <div className={styles.notice}>
                      <strong>Billing:</strong> You’ll pay a one-time{" "}
                      <strong>$500 setup fee</strong> when you sign up. Your
                      monthly plan will start on the
                      <strong> 1st of the following month</strong>.
                    </div>
                  </div>

                  <div className={styles.servicesCardBottom}>
                    {x.servicesInclude.map((z) => (
                      <p className={styles.description} key={z.description}>
                        {z.description}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
