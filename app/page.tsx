import { HomePageHero, HomePageMain } from "components/notice";
import { SortOptions } from "types/enums/sort.enum";
import getNotices from "utils/api/getNotices";
import styles from "./page.module.scss";

interface HomePageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const HomePage = async ({
  searchParams,
}: HomePageProps) => {
  const { keyword, sort, filter } = searchParams;
  const noticeList = await getNotices({ keyword, sort, filter });
  let sortOptionId = 0;

  switch (sort) {
    case SortOptions.PAY:
      sortOptionId = 1;
      break;
    case SortOptions.HOUR:
      sortOptionId = 2;
      break;
    case SortOptions.SHOP:
      sortOptionId = 3;
      break;
    default:
      break;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.top}>
        <HomePageHero />
      </div>
      <div className={styles.bottom}>
        <HomePageMain
          noticeList={noticeList}
          keyword={keyword}
          sortOptionId={sortOptionId}
          filter={filter}
        />
      </div>
    </div>
  );
};

export default HomePage;
