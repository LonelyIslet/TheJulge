import { CardList, CommonLayout } from "components/common";
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
  const keyword = searchParams.q as string;
  const noticeList = await getNotices(keyword);

  return (
    <div className={styles.layout}>
      <div className={styles.top}>
        <CommonLayout position="below">
          <div className={styles.noticeWrapper}>
            <h1>맞춤 공고</h1>
            <div className={styles.premiumNoticeList}>
              {/* <CardList /> */}
            </div>
          </div>
        </CommonLayout>
      </div>
      <main className={styles.bottom}>
        {/* <div className={styles.noticeWrapper}> */}
        <CommonLayout position="below">
          <div className={styles.firstLine}>
            <h2>전체 공고</h2>
            <div className={styles.buttonContainer}>
              <SortButton />
              <FilterButton />
            </div>
          </div>
          {/* </div> */}
          <div className={styles.noticeList}>
            <CardList noticeList={noticeList} />
          </div>
        </CommonLayout>
      </main>
    </div>
  );
};

export default HomePage;
