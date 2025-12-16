import styles from "./LoginPageIntro.module.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
// import LoginSvg from "@/components/icons/LoginSvg/LoginSvg";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import Image from "next/image";
import Img1 from '../../../../public/images/loginii.jpg'

export default function LoginPageIntro() {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.imgContainer}>
              <Image src={Img1} alt='' fill className={styles.img} />
            </div>
          </div>
          <div className={styles.right}>
            <h1 className={styles.heading}>Welcome back</h1>
            <p className={styles.copy}>
              Enter your email and password to access your account
            </p>
            <div className={styles.formContainer}>
              <LoginForm />
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
