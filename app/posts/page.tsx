import { HomePageMain } from "components/notice";
import getNotices from "utils/api/getNotices";
import { SortOptions } from "types/enums/sort.enum";
import styles from "./page.module.scss";

interface HomePageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const HomePage = async ({
  searchParams,
}: HomePageProps) => {
  const { keyword, sort } = searchParams;
  const noticeList = await getNotices(keyword, sort);
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
      <div className={styles.bottom}>
        <HomePageMain
          noticeList={noticeList}
          keyword={keyword}
          sortOptionId={sortOptionId}
        />
      </div>
    </div>
  );
};

export default HomePage;
