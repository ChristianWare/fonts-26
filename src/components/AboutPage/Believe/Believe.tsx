import styles from "./Believe.module.css";
import Image from "next/image";
import Img1 from "../../../../public/images/whydb.jpg";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";

const data = [
  {
    id: 1,
    title: "Experience building fast, conversion-focused websites",
  },
  {
    id: 2,
    title: "A tight focus on service businesses and booking flows",
  },
  {
    id: 3,
    title: "A genuine desire to understand how your specific business runs",
  },
];

export default function Believe() {
  return (
    <section className={styles.parent}>
      <div className={styles.container}>
        <div className={styles.imgOverlay} />
        <Image
          src={Img1}
          alt='Hero Image'
          fill
          className={styles.img}
          quality={100}
        />
        <div className={styles.content}>
          <SectionIntroii title='Positioning' color='tan' />
          <h2 className={styles.heading}>
            We&apos;re New to Some Industries, But Not New to Building Online.
          </h2>
          <p className={styles.copy}>
            Here’s the honest part: Fonts & Footers is still early in some of
            these niches. Our first official client is{" "}
            <b>Nier Transportation</b>, a black-car service that needed a
            direct-booking site their clients could actually use. That project
            helped shape the way we think about:
          </p>
          <div className={styles.mapDataContainer}>
            {data.map((item) => (
              <div key={item.id} className={styles.card}>
                <span className={styles.bulletPoint} />
                <p className={styles.title}>{item.title}</p>
              </div>
            ))}
          </div>
          <br />
          <br />
          <SectionIntroii title='That means:' color='tan' />
          <div className={styles.mapDataContainer}>
            <p className={styles.copy}>
              You get extra attention, not a cookie-cutter template. We explain
              things in plain language. We&apos;re hungry to prove ourselves in
              your space—and we do that by making your booking experience
              tangibly better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
