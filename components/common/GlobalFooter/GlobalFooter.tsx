import Image from "next/image";
import Link from "next/link";
import styles from "./GlobalFooter.module.scss";

const GlobalFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>© codeit - 2023</div>
        <div className={styles.infoContainer}>
          <Link href="/privacy" className={styles.policy}>
            Privacy Policy
          </Link>
          <Link href="/faq" className={styles.faq}>
            FAQ
          </Link>
        </div>
        <div className={styles.iconContainer}>
          <Link
            href="https://mail.google.com/"
            className={styles.icon}
            target="_blank"
          >
            <Image
              src="/images/email-gray.svg"
              alt="email"
              width={25}
              height={25}
            />
          </Link>
          <Link
            href="https://ko-kr.facebook.com/"
            className={styles.icon}
            target="_blank"
          >
            <Image
              src="/images/facebook-gray.svg"
              alt="facebook"
              width={25}
              height={25}
            />
          </Link>
          <Link
            href="https://www.instagram.com/"
            className={styles.icon}
            target="_blank"
          >
            <Image
              src="/images/instagram-gray.svg"
              alt="instagram"
              width={25}
              height={25}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;
