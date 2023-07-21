import styles from "./page.module.scss";

export const metadata = {
  title: "FAQ | 더줄게",
};

const FaqPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        FAQ
      </div>
    </main>
  );
};

export default FaqPage;
