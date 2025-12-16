// app/not-found.tsx
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import styles from "./404.module.css";
import Image from "next/image";
import SectionIntroii from "@/components/shared/SectionIntroii/SectionIntroii";
import Button from "@/components/shared/Button/Button";
import Img1 from "../../public/images/404.png";
import Nav from "@/components/shared/Nav/Nav";
import FinalCTAMain from "@/components/shared/FinalCTAMain/FinalCTAMain";

export default function NotFound() {
  return (
    <main>
      <Nav />
      <div className={styles.container}>
        <LayoutWrapper>
          <div className={styles.content}>
            <div className={styles.top}>
              <div className={styles.imgContainer}>
                <Image
                  src={Img1}
                  alt='thinking'
                  fill
                  className={styles.img}
                  priority
                />
              </div>
              <SectionIntroii title='404 - Not Found' />
              <h1 className={styles.heading}>
                The page you’re looking for <br /> doesn’t exist or was moved.
              </h1>
              <p className={styles.copy}>
                Let’s create something amazing together. Reach out today to
                discuss your project and see how we can help bring your vision
                to life.
              </p>
              <div className={styles.btnContainer}>
                <Button href='/' btnType='accent' text='Go back home' />
              </div>
            </div>
            <div className={styles.bottom}></div>
          </div>
        </LayoutWrapper>
      </div>
      <FinalCTAMain />
    </main>
  );
}
