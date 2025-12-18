// app/account/upgrade/page.tsx
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import styles from "./Upgrade.module.css";
import { pricingData } from "@/lib/data";
import Link from "next/link";
// import Features from "@/components/HomePage/Features/Features";
import Button from "@/components/shared/Button/Button";
import Check from "@/components/shared/icons/Check/Check";

export const runtime = "nodejs";

type Plan = "SOLO" | "TEAM" | "RENTAL_FLEET" | "MULTI_LOCATION";

function planToService(plan: Plan) {
  switch (plan) {
    case "SOLO":
      return "Solo";
    case "TEAM":
      return "Team";
    case "RENTAL_FLEET":
      return "Rental/Fleet";
    case "MULTI_LOCATION":
      return "Multi-Location";
  }
}

// find the pricingData entry that matches a Plan enum
function findPlanData(plan: Plan) {
  const service = planToService(plan);
  return pricingData.find((p) => p.service === service);
}

export default async function UpgradePage({
  searchParams,
}: {
  // your project uses Promise-based props; await it for type safety
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  const sp = await searchParams;
  const planParam = (sp.plan ?? "").toUpperCase() as Plan;

  const validPlans: Plan[] = ["SOLO", "TEAM", "RENTAL_FLEET", "MULTI_LOCATION"];
  const isValid = validPlans.includes(planParam);

  if (!isValid) {
    // no/invalid plan selected — send them to pricing to choose
    redirect("/pricing");
  }

  const data = findPlanData(planParam);
  if (!data) {
    redirect("/pricing");
  }

  return (
    <main>
      <section className={styles.container}>
        <div className={styles.top}>
          <h1 className={styles.heading}>{data!.service} — Subscribe</h1>
          <p className={styles.copy}>{data!.desc}</p>

          <Link href='/pricing' className={styles.backLink}>
            ← Change plan
          </Link>
        </div>

        <section className={styles.card}>
          <div className={styles.cardTop}>
            <h2 className={styles.price}>{data!.price}</h2>
          </div>

          <div className={styles.features}>
            {data!.servicesInclude.map((f) => (
              <div key={f.serviceName} className={styles.featureItem}>
                {/* <span className={styles.check}>✓</span> */}
                <Check className={styles.icon} />
                <div className={styles.featureInfo}>
                  <div className={styles.featureName}>{f.serviceName}</div>
                  <div className={styles.featureDesc}>{f.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.notice}>
            <strong>Billing:</strong>
            <br />
            <br />
            You’ll pay a one-time <strong>$500 setup fee</strong> when you sign
            up. Your monthly plan{" "}
            <strong>
              ({data!.service} - {data!.price}){" "}
            </strong>
            will start on the <strong>1st of the following month</strong>.
          </div>

          <form
            method='POST'
            action='/account/upgrade/start'
            className={styles.actions}
          >
            <input type='hidden' name='plan' value={planParam} />
            <div className={styles.btnContainer}>
              <Button
                type='submit'
                btnType='black'
                text='Pay $500 setup & continue'
              />
            </div>
            <p className={styles.secureNote}>Secure checkout via Stripe</p>
          </form>
        </section>
      </section>
      {/* <Features /> */}
    </main>
  );
}
