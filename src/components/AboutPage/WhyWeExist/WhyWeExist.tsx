import styles from "./WhyWeExist.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import Image from "next/image";
import Img1 from "../../../../public/images/WhyWeExist.jpg";

const data = [
  {
    id: 1,
    title: "A link in your bio",
  },
  {
    id: 2,
    title: "A booking app page you don’t control",
  },
  {
    id: 3,
    title: "A half-finished site you meant to “get back to someday”",
  },
  {
    id: 4,
    title: "A DIY website that looks like everyone else’s",
  },
];

const dataii = [
  {
    id: 5,
    title: "Clients get lost trying to book",
  },
  {
    id: 6,
    title: "Prices and policies aren't clear",
  },
  {
    id: 7,
    title: "Marketplaces and apps sit between you and your client",
  },
  {
    id: 8,
    title:
      'You\'re answering the same "how much?" and "are you free at…?" messages over and over',
  },
];

export default function WhyWeExist() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.top}>
          <h2 className={styles.heading}>Why We Exist</h2>
          <p className={styles.copy}>
            Most service business owners didn’t get into business to wrestle
            with websites and booking tools.
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              <div className={styles.rightTwo}>
                <div className={styles.rightTwoA}>
                  <div className={styles.SectionIntroContainer}>
                    Your online experience
                  </div>
                  <p className={styles.subHeadingii}>
                    You’re driving clients to the airport, working one-on-one in
                    the gym, cutting hair, or running a small team. Your online
                    experience usually gets built in the margins:
                  </p>
                </div>
                <div className={styles.rightTwoB}>
                  <ul className={styles.mapDataContainer}>
                    {data.map((item) => (
                      <li key={item.id} className={styles.card}>
                        <span className={styles.span} />
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.middle}>
            <div className={styles.imgContainer}>
              <Image
                src={Img1}
                fill
                title='Why we exist'
                alt='Why we exist'
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.rightTwoii}>
              <div className={styles.rightTwoA}>
                <div className={styles.SectionIntroContainer}>The Result?</div>
              </div>
              <div className={styles.rightTwoB}>
                <ul className={styles.mapDataContainer}>
                  {dataii.map((item) => (
                    <li key={item.id} className={styles.card}>
                      <span className={styles.span} />
                      {item.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
