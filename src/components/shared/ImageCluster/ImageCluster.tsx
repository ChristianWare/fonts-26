import styles from "./ImageCluster.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/Adam.jpg";
import Img2 from "../../../../public/images/alice.jpg";
import Img3 from "../../../../public/images/charlie.jpg";
import Img4 from "../../../../public/images/jane.jpg";
import Img5 from "../../../../public/images/person.jpg";
import Starii from "@/components/icons/Starii/Starii";

interface Props {
  color?: string;
  size?: string;
  orientation?: string;
}

export default function ImageCluster({
  color = "",
  size = "",
  orientation = "",
}: Props) {
  return (
    <div className={`${styles.container} ${styles[orientation]}`}>
      <div className={styles.imageCluster}>
        <Image
          src={Img1}
          alt='Adam'
          className={`${styles.image} ${styles[size]} `}
          priority
        />
        <Image
          src={Img2}
          alt='Alice'
          className={`${styles.image} ${styles[size]}`}
          priority
        />
        <Image
          src={Img3}
          alt='Charlie'
          className={`${styles.image} ${styles[size]}`}
          priority
        />
        <Image
          src={Img4}
          alt='Jane'
          className={`${styles.image} ${styles[size]} `}
          priority
        />
        <Image
          src={Img5}
          alt='Person'
          className={`${styles.image} ${styles[size]} `}
          priority
        />
        {/* <div className={styles.starContainer}>
          <Starii className={styles.icon} />
        </div> */}
      </div>
      <div className={styles.bottom}>
        <div className={styles.b1}>
          <Starii className={styles.icon} />
          <Starii className={styles.icon} />
          <Starii className={styles.icon} />
          <Starii className={styles.icon} />
          <Starii className={styles.icon} />
        </div>
        <div className={styles.b2}>
          <p className={`${styles.copy} ${styles[color]}`}>
            Trusted by multiple clients (4.9/5)
          </p>
        </div>
      </div>
    </div>
  );
}
