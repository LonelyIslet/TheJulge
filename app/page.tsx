// import { CardList } from "components/common";
import { FilterButton, SortButton } from "components/notice";
import RecommendedNoticeList from "components/notice/RecommendedNoticeList/RecommendedNoticeList";
import { CommonLayout } from "components/common";
import styles from "./page.module.scss";

const HomePage = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.top}>
        <CommonLayout position="below">
          <div>
            <h2>맞춤 공고</h2>
          </div>
          <RecommendedNoticeList />
        </CommonLayout>
      </div>
      <main className={styles.bottom}>
        <CommonLayout position="below">
          {/* <div className={styles.noticeWrapper}> */}
          <div className={styles.firstLine}>
            <h2>전체 공고</h2>
            <div className={styles.buttonContainer}>
              <SortButton />
              <FilterButton />
            </div>
          </div>
          <div className={styles.cheesyNoticeList}>
            {/* <CardList /> */}
          </div>
          {/* </div> */}
        </CommonLayout>
      </main>
    </div>
  );
};

export default HomePage;
