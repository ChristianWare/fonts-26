import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./ContactPageContainer.module.css";
import ContactForm from "@/components/shared/ContactForm/ContactForm";
import Image from "next/image";
import Img1 from "../../../../public/images/chris.png";

export default function ContactPageContainer() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.heading}>
              Contact <br />{" "}
              <span className={styles.span}>Fonts & Footers</span>
            </h2>
            {/* <p className={styles.copy}>
              Have a question, need a quote, or just curious whether a custom
              booking platform is right for you? Drop a line — no strings
              attached. We reply within one business day.
            </p> */}

            <div className={styles.ownerbox}>
              <div className={styles.imgContainer}>
                <Image src={Img1} alt='owner' className={styles.img} />
              </div>
              <div className={styles.ownerRight}>
                <span className={styles.owner}>Chris Ware</span>
                <p className={styles.title}>Founder & CEO</p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <ContactForm />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
