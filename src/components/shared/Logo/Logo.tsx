import styles from "./Logo.module.css";
import Link from "next/link";
import Image from "next/image";
import Img1 from "../../../../public/logos/logoGreen.png";

const Logo = () => {
  return (
    <Link href='/' className={styles.logo}>
      <div className={styles.imgContainer}>
        <Image src={Img1} alt='Logo' fill className={styles.img} />
      </div>
      <section className={styles.container}>
        <span className={styles.text}>Fonts & Footers</span>
      </section>
    </Link>
  );
};

export default Logo;
