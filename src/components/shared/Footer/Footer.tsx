import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";
import LayoutWrapper from "../LayoutWrapper";
import Arizona from "@/components/icons/Arizona/Arizona";
import LinkedIn from "@/components/icons/LinkedIn/LinkedIn";
import Instagram from "@/components/icons/Instagram/Instagram";
import Facebook from "@/components/icons/Facebook/Facebook";
import Link from "next/link";

const data = [
  {
    id: 1,
    title: "Services",
    options: [
      {
        id: 1.1,
        option: "Web Design",
      },
      {
        id: 1.2,
        option: "Web Development",
      },
      {
        id: 1.3,
        option: "Branding",
      },
      {
        id: 1.4,
        option: "SEO Optimization",
      },
      {
        id: 1.5,
        option: "Maintenance & Support",
      },
    ],
  },
  {
    id: 2,
    title: "About",
    options: [
      {
        id: 2.1,
        option: "Our Team",
      },
      {
        id: 2.2,
        option: "Portfolio",
      },
      {
        id: 2.3,
        option: "Testimonials",
      },
      {
        id: 2.4,
        option: "Careers",
      },
    ],
  },
  {
    id: 3,
    title: "Contact",
    options: [
      {
        id: 3.1,
        option: "hello@fontsandfooters.com",
      },
      {
        id: 3.2,
        option: "Request a Quote",
      },
      {
        id: 3.3,
        option: "Support",
      },
      {
        id: 3.4,
        option: "FAQs",
      },
    ],
  },
];

const data2 = [
  {
    id: 4,
    title: "Privacy Policy",
  },
  {
    id: 5,
    title: "Terms & Conditions",
  },
  {
    id: 6,
    title: "Cookie Preferences",
  },
  {
    id: 7,
    title: "Legal Information",
  },
];

const data3 = [
  {
    id: 8,
    href: "https://www.linkedin.com/feed/",
    icon: <LinkedIn className={styles.socialIcon} />,
  },
  {
    id: 9,
    href: "https://www.instagram.com/fontsandfooters/",
    icon: <Instagram className={styles.socialIcon} />,
  },
  {
    id: 10,
    href: "https://www.facebook.com/fontsandfooters",
    icon: <Facebook className={styles.socialIcon} />,
  },
];

export default function Footer() {
  return (
    <>
      <footer className={styles.container}>
        <LayoutWrapper>
          <div className={styles.logoContainer}>
            <Logo />
          </div>
          <div className={styles.top}>
            <div className={styles.left}>
              <h2 className={styles.heading}>
                We build <br />
                <span className={styles.span}> booking websites </span> <br />
                that fill calendars
              </h2>
            </div>
            <div className={styles.right}>
              {data.map((x) => (
                <div className={styles.optionSection} key={x.id}>
                  <div className={styles.title}>{x.title}</div>
                  <ul className={styles.optionList}>
                    {x.options.map((y) => (
                      <li key={y.id} className={styles.option}>
                        {y.option}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.b1}>
              <Arizona className={styles.icon} />
              <p className={styles.iconText}>Based in Phoenix, AZ</p>
            </div>
            <div className={styles.b2}>
              <div className={styles.data2Container}>
                {data2.map((x) => (
                  <p key={x.id} className={styles.optionii}>
                    {x.title}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.b3}>
              {data3.map((x) => (
                <div key={x.id} className={styles.socialIconContainer}>
                  <Link href={x.href} target='_blank'>
                    {x.icon}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </LayoutWrapper>
      </footer>
      <br className={styles.br} />
    </>
  );
}
