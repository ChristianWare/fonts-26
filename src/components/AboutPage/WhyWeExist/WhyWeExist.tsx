import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./WhyWeExist.module.css";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Button from "@/components/shared/Button/Button";
import Image from "next/image";
import Img1 from "../../../../public/images/WhyWeExist.jpg";
// import Calendar from "@/components/icons/Calendar/Calendar";
import Arrow from "@/components/shared/icons/Arrow/Arrow";

const data = [
  {
    id: 1,
    title: "Create clarity",
  },
  {
    id: 2,
    title: "Reduce risk",
  },
  {
    id: 3,
    title: "Build connection",
  },
  {
    id: 4,
    title: "It’s that simple.",
  },
];

export default function WhyWeExist() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              <SectionIntroii title='Why We Exist' />
              <h2 className={styles.heading}>
                Most service businesses don’t have a marketing problem—they have
                a booking problem. Clunky forms, mixed-up calendars, and payment
                chasing leak revenue every day. We started Fonts & Footers to
                fix the moment that matters most: when a customer decides to
                book now.
              </h2>
              <div className={styles.btnContainer}>
                <Button
                  href='/contact'
                  btnType='black'
                  text='Book your discovery call'
                />
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
            
            <div className={styles.rightTwo}>
              <div className={styles.rightTwoA}>
                <div className={styles.SectionIntroContainer}>
                  {/* <SectionIntro title='The psychology' /> */}
                  The psychology
                </div>
                <p className={styles.subHeadingii}>
                  Buying services isn’t like buying a product. People need to
                  know, like, and trust you before they commit. So we design
                  every page to do one of three jobs:
                </p>
                {/* <Calendar className={styles.icon} /> */}
              </div>
              <div className={styles.rightTwoB}>
                <ul className={styles.mapDataContainer}>
                  {data.map((item) => (
                    <li key={item.id} className={styles.card}>
                      {item.title}
                      <Arrow className={styles.arrow} />
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
