import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <>
      <header className={styles.premiumNotice}>
        맞춤 공고
      </header>
      <main className={styles.cheesyNotice}>
        전체 공고
      </main>
    </>
  );
};

export default HomePage;
