import Img from "../../../public/images/whydb.jpg";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "../leagal.module.css";
import Image from "next/image";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
};

const TermsPage = () => {
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
              Terms & <br /> Conditions
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
          <h2>1. Acceptance of Terms</h2>
          <p>
            Welcome to Fonts &amp; Footers’ website. By accessing or using this
            website and any related services or materials, you agree to comply
            with and be bound by these Terms of Use (&quot;Terms&quot;). If you
            do not agree to these Terms, please do not use this website.
          </p>
          <br />
          <h2>2. Changes to Terms</h2>
          <p>
            Fonts &amp; Footers may modify, amend, or update these Terms at any
            time without prior notice. Any changes are effective immediately
            upon posting. Your continued use of the website following the
            posting of changes constitutes your acceptance of those changes.
          </p>
          <br />
          <h2>3. Use of the Website</h2>
          <p>
            You must be at least 18 years old to use this website. You agree to
            use the site for lawful purposes only and in a manner consistent
            with all applicable laws and regulations. You may not use this
            website in any way that could damage, disable, overburden, or impair
            Fonts &amp; Footers’ services or interfere with other users’
            enjoyment of the website.
          </p>
          <br />
          <h2>4. Intellectual Property</h2>
          <p>
            All content, trademarks, logos, design assets, code samples, and
            other intellectual property on this website are the property of
            Fonts &amp; Footers and are protected by copyright and other
            intellectual property laws. You may not use, reproduce, adapt, or
            distribute any content from this website without prior written
            permission from Fonts &amp; Footers.
          </p>
          <br />
          <h2>5. Privacy</h2>
          <p>
            Your use of this website is also governed by our Privacy Policy,
            which can be found at <a href='/legal/privacy'>/legal/privacy</a>.
            By using this website, you consent to the collection and use of your
            information as described in the Privacy Policy.
          </p>
          <br />
          <h2>6. Disclaimer of Warranties</h2>
          <p>
            This website is provided &quot;as is&quot; without warranties of any
            kind, whether express or implied. Fonts &amp; Footers disclaims all
            warranties, including but not limited to the accuracy, completeness,
            reliability, or availability of this website and its content.
          </p>
          <br />
          <h2>7. Limitation of Liability</h2>
          <p>
            Fonts &amp; Footers will not be liable for any direct, indirect,
            incidental, special, consequential, or punitive damages arising out
            of or related to your access to or use of this website, even if
            advised of the possibility of such damages.
          </p>
          <br />
          <h2>8. Governing Law</h2>
          <p>
            These Terms are governed by and construed in accordance with the
            laws of the State of Arizona, USA, without regard to its conflict of
            law principles. Any disputes arising from or in connection with
            these Terms will be subject to the exclusive jurisdiction of the
            state and federal courts located in Maricopa County, Arizona.
          </p>
          <br />
          <h2>9. Contact Information</h2>
          <p>
            If you have any questions or concerns regarding these Terms, please
            contact us:
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
        </div>
      </LayoutWrapper>
      <FinalCTAMain />
    </main>
  );
};
export default TermsPage;

// Fonts & Footers
