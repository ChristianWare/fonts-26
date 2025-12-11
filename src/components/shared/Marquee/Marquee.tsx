import styles from "./Marquee.module.css";
import Image, { StaticImageData } from "next/image";
import Img1 from "../../../../public/images/trainer.jpg";
import Img2 from "../../../../public/images/salon.jpg";
import Img3 from "../../../../public/images/equipment.jpg";
import Img4 from "../../../../public/images/medspaii.jpg";
import Img5 from "../../../../public/images/vacation.jpg";
import Img6 from "../../../../public/images/transport.jpg";
import Img7 from "../../../../public/images/caterers.jpg";
import Button from "../Button/Button";

const industries: { title: string; src: StaticImageData }[] = [
  { title: "Salons & Studios", src: Img2 },
  { title: "Personal trainers & coaches", src: Img1 },
  { title: "Equipment Rentals", src: Img3 },
  { title: "Med-Spa & Clinics", src: Img4 },
  { title: "Vacation Rentals", src: Img5 },
  { title: "Luxury Transport", src: Img6 },
  { title: "Caterers", src: Img7 },
];

export default function Marquee() {
  return (
    <div className={styles.slider}>
      <div className={styles.track}>
        {[...industries, ...industries].map(({ src, title }, index) => (
          <div key={`${title}-${index}`} className={styles.card}>
            <div className={styles.imgContainer}>
              <Image
                src={src}
                alt={title}
                fill
                className={styles.img}
                sizes='(max-width: 768px) 100vw, 300px'
                priority={index < 4}
              />
            </div>
            <div className={styles.cardBottom}>
              <div className={styles.label}>{title}</div>
              <p className={styles.desc}>
                Simplify HR with employee self-service powered by Al. Answer
                policy questions, manage benefits, and ensure satisfaction
                across the board.
              </p>
              <div className={styles.btnContainer}>
                <Button
                  href='/contact'
                  btnType='lightGray'
                  text='More Details'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
