import Image from "next/image";
import Link from "next/link";
import { AuthForm } from "components/auth";
import styles from "./page.module.scss";
import "./page.scss";

const AuthPage = () => {
  return (
    <main className={styles.container}>
      <Link href="/" className={styles.logoContainer}>
        <Image src="/images/logo-white.svg" alt="로고" fill />
      </Link>
      <article>
        <section className={styles.promotionArea}>
          <h1>
            당신의 시간이 가치 있을 수 있도록,
            <br />
            <strong>더줄게</strong>
          </h1>
          <div style={{ width: "732px", height: "438px", position: "relative" }}>
            <Image src="/images/landing-img.png" fill alt="랜딩 이미지" sizes="100vw" priority />
          </div>
          <p>
            사장님도 알바님도 간편하게 서로를 찾을 수 있게.
            <br />
            급한 일손, 단기 알바, 행사 인력 모두 한 곳에서!
          </p>
        </section>
        <section className={styles.formArea}>
          <AuthForm />
        </section>
      </article>
    </main>
  );
};

export default AuthPage;
