import Img from "../../../public/images/whydb.jpg";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "../leagal.module.css";
import Image from "next/image";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
};

const PrivacyPage = () => {
  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <div className={styles.imgOverlay}></div>
        <Image
          src={Img}
          alt='Fonts & Footers'
          fill
          className={styles.img2}
          sizes='100vw'
          priority
          quality={100}
        />
        <Nav />
        <LayoutWrapper>
          <div className={styles.mainContent}>
            <h1 className={styles.heading} lang='en'>
              Privacy Policy Statement <br /> for Fonts &amp; Footers
            </h1>
            
          </div>
        </LayoutWrapper>
      </section>
      <LayoutWrapper>
        <div className={styles.content}>
          <p>
            <strong>Effective Date: 09/25/2025</strong>
          </p>
          <br />
          <h2>1. Information Collection and Use</h2>
          <p>
            We may collect personal information such as your name, email, phone
            number, company name, project details, and payment information when
            you inquire through our contact form, book a consultation, subscribe
            to our updates, or become a client. We use this information solely
            to provide, improve, and support our services, communicate with you,
            and operate our business.
          </p>
          <br />
          <h2>2. Information Sharing</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share information with trusted service providers
            (e.g., hosting, analytics, payment processors) who assist in
            operating our website and delivering our services. These providers
            are obligated to maintain confidentiality and may not use your
            information for any other purpose.
            <br />
            <br />
          </p>
          <h2>3. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your
            personal information from unauthorized access, alteration,
            disclosure, or destruction. However, no method of transmission over
            the internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>
          <br />
          <h2>4. Cookies</h2>
          <p>
            We may use cookies and similar technologies to enhance your
            experience, remember preferences, analyze traffic, and improve
            content. You can disable cookies in your browser settings; doing so
            may limit some features of the website.
          </p>
          <br />
          <h2>5. Links to Third-Party Websites</h2>
          <p>
            Our website may contain links to third-party sites for your
            convenience. We are not responsible for the privacy practices or
            content of those sites. We recommend reviewing the privacy policies
            of any third-party websites you visit.
          </p>
          <br />
          <h2>6. Changes to this Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. We will post the updated policy
            on this page and update the effective date above.
          </p>
          <br />
          <h2>7. Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this Privacy
            Policy or your personal information, please contact us:
            <br />
            <br />
            <strong>
              Mailing Address (correspondence only):
              <br />
              Scottsdale, AZ, USA
            </strong>
            <br />
            <br />
            <strong>
              Email
              <br />
              hello@fontsandfooters.com
            </strong>
            <br />
            <br />
            <strong>
              Contact Form
              <br />
              fontsandfooters.com/contact
            </strong>
          </p>
          <br />
          <b>
            By using our website or services, you consent to the collection,
            use, and disclosure of your personal information as described in
            this Privacy Policy.
          </b>
        </div>
      </LayoutWrapper>
      <FinalCTAMain />
    </main>
  );
};

export default PrivacyPage;
