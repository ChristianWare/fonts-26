import SectionIntroii from "../SectionIntroii/SectionIntroii";
import styles from "./Logo.module.css";
import Link from "next/link";


const Logo = () => {
  return (
    <Link href='/' className={styles.text}>
      {/* Fonts & Footers */}
      <SectionIntroii title='Fonts & Footers' color='white' />
    </Link>
  );
};

export default Logo;
