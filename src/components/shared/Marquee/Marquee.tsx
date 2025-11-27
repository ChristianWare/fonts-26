import styles from "./Marquee.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/ecomm.jpeg";
import Img2 from "../../../../public/images/salon.jpg";
import Img3 from "../../../../public/images/equipment.jpg";
import Img4 from "../../../../public/images/medspa.jpg";
import Img5 from "../../../../public/images/vacation.jpg";
import Img6 from "../../../../public/images/transport.jpg";
import Img7 from "../../../../public/images/membership.jpg";
import { StaticImageData } from "next/image";
import SectionIntro from "../SectionIntro/SectionIntro";

// DATA
const industries: { title: string; src: StaticImageData }[] = [
  { title: "Ecommerce (Coming soon)", src: Img1 },
  { title: "Salons & Studios", src: Img2 },
  { title: "Equipment Rentals", src: Img3 },
  { title: "Med-Spa & Clinics", src: Img4 },
  { title: "Vacation Rentals", src: Img5 },
  { title: "Luxury Transport", src: Img6 },
  { title: "Memberships", src: Img7 },
];

export default function Marquee() {
  return (
    <div className={styles.slider}>
      <span className={styles.title}>
        <SectionIntro title='Industries we work with' />
      </span>

      <div className={styles.track}>
        {[...industries, ...industries].map(({ src, title }, index) => (
          <div key={`${title}-${index}`} className={styles.imgContainer}>
            <Image
              src={src}
              alt={title}
              fill
              className={styles.img}
              sizes='(max-width: 768px) 100vw, 300px'
              priority={index < 4}
            />
            <div className={styles.overlay} aria-hidden='true' />
            <span className={styles.label}>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
