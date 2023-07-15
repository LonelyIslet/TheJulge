// import { CardList } from "components/common";
import { FilterButton, SortButton } from "components/notice";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.noticeWrapper}>
          <h1>맞춤 공고</h1>
          <div className={styles.premiumNoticeList}>
            {/* <CardList /> */}
          </div>
        </div>
      </header>
      <main>
        <div className={styles.noticeWrapper}>
          <div className={styles.firstLine}>
            <h1>전체 공고</h1>
            <div className={styles.buttonContainer}>
              <SortButton />
              <FilterButton />
            </div>
          </div>
          <div className={styles.cheesyNoticeList}>
            {/* <CardList /> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
