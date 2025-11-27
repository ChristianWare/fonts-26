import styles from "./ParallaxImage.module.css";
import Image, { StaticImageData } from "next/image";

interface ParallaxImageProps {
  src: string | StaticImageData;
  alt: string;
  title: string;
  color?: string;
  border?: string;
}

export default function ParallaxImage({
  src,
  alt,
  color = "",
}: ParallaxImageProps) {
  return (
    <div className={styles.parent}>
      <div className={`${styles.container} ${styles[color]} `}>
        <div className={styles.imgContainer}>
          <Image
            fill
            src={typeof src === "string" ? src : src.src}
            alt={alt}
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
}
