import { CardList } from "components/common";
import { FilterButton, SortButton } from "components/notice";
import getNotices from "utils/api/getNotices";
import styles from "./page.module.scss";

export interface HomePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const HomePage = async ({
  searchParams,
}:HomePageProps) => {
  // const { q } = searchParams;
  const noticeList = await getNotices();

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
            <CardList noticeList={noticeList} />
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;
