import { HomePageMain } from "components/notice";
import getNotices from "utils/api/getNotices";
import { SortOptions } from "types/enums/sort.enum";
import styles from "./page.module.scss";

interface NoticesPageProps {
  searchParams: {
    [key: string]: string | undefined
  }
}

const NoticesPage = async ({
  searchParams,
}: NoticesPageProps) => {
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

export default NoticesPage;
