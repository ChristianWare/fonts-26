import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./WhoIsThisFor.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/whydb.jpg";
import Button from "@/components/shared/Button/Button";
import Check from "@/components/shared/icons/Check/Check";
import Close from "@/components/shared/icons/Close/Close";

const data1 = [
  {
    id: 1,
    title: "You want for a site you’re proud of",
  },
  {
    id: 2,
    title: "You're ready to attract more local clients",
  },
  {
    id: 3,
    title: "You're ready to move away from clunky booking apps",
  },
  {
    id: 4,
    title: "You want a website that clearly communicates you",
  },
];

const data2 = [
  {
    id: 5,
    title: "You want a cheap site",
  },
  {
    id: 6,
    title: "You're looking for a big agency",
  },
  {
    id: 7,
    title: "You don't care about local SEO",
  },
  {
    id: 8,
    title: "You don't want clear pricing",
  },
];

export default function WhoIsThisFor() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              Who Fonts & Footers <br /> is perfect for
            </h2>
            <p className={styles.copy}>
              You don’t need a giant agency. You need someone who understands
              booking.
            </p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomLeft}>
              <div className={styles.imgContainer}>
                <Image
                  src={Img1}
                  alt='Description'
                  title='Title'
                  fill
                  className={styles.img}
                />
              </div>
              <div className={styles.details1}>
                <div className={styles.detailsTop}>
                  <h3 className={`${styles.subheading} subheading`}>
                    We&apos;re a fit if:
                  </h3>
                  <ul className={styles.mapDataContainer}>
                    {data1.map((x) => (
                      <li key={x.id} className={styles.item}>
                        <Check className={styles.icon} />
                        {x.title}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.btnContainer}>
                  <Button
                    href='/contact'
                    btnType='accent'
                    text='Book your discovery call'
                  />
                </div>
              </div>
            </div>
            <div className={styles.bottomRight}>
              <div className={styles.details2}>
                <div className={styles.detailsTop}>
                  <h3 className={`${styles.subheading} subheading`}>
                    Not a fit if:
                  </h3>
                  <ul className={styles.mapDataContainer}>
                    {data2.map((x) => (
                      <li key={x.id} className={styles.item}>
                        <Close className={styles.closeIcon} />
                        {x.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
