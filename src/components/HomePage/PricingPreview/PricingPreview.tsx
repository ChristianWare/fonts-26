import styles from "./PricingPreview.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import ServiceDetails from "@/components/PricingPage/ServiceDetails/ServiceDetails";
import Button from "@/components/shared/Button/Button";
import Faq from "@/components/Faq/Faq";

export default function PricingPreview() {
  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.cornerContainer}>
          <div className={styles.corner}>
            <SectionIntroii title="Pricing + Faq's" />
          </div>
        </div>{" "}
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              <h2 className={styles.heading}>Plans made simple</h2>
            </div>
            <div className={styles.bottom}>
              <ServiceDetails />
            </div>
            <div className={styles.btnContainer}>
              <Button
                href='/pricing'
                btnType='black'
                text='See all pricing details'
              />
            </div>
          </div>
        <Faq />
        </LayoutWrapper>
      </div>
    </section>
  );
}
