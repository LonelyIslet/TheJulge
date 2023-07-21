import styles from "./page.module.scss";

export const metadata = {
  title: "개인정보 처리 방침 | 더줄게",
};

const PrivacyPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        개인정보 처리 방침
      </div>
    </main>
  );
};

export default PrivacyPage;
