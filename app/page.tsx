import { HomePageHero, HomePageMain } from "components/notice";
import { SortOptions } from "types/enums/sort.enum";
import { GetNoticesParams } from "types/notice/filter";
import LIMIT from "constants/notice/options/LIMIT";
import convertToArray from "utils/convertToArray";
import getFirstValue from "utils/getFirstValue";
import getNotices from "utils/api/getNotices";
import styles from "./page.module.scss";

interface HomePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const HomePage = async ({
  searchParams,
}: HomePageProps) => {
  const processedParams: GetNoticesParams = {
    page: Number(getFirstValue(searchParams.page)) || undefined,
    keyword: getFirstValue(searchParams.keyword),
    sort: getFirstValue(searchParams.sort),
    address: convertToArray(searchParams.address),
    startsAtGte: getFirstValue(searchParams.startsAtGte),
    hourlyPayGte: Number(getFirstValue(searchParams.hourlyPayGte)) || undefined,
  };

  const {
    page,
    keyword,
    sort,
    address,
    startsAtGte,
    hourlyPayGte,
  } = processedParams;

  const { count, noticeList } = await getNotices({
    page,
    keyword,
    sort,
    address,
    startsAtGte,
    hourlyPayGte,
  });

  let offset: number | undefined;
  let currentPage = 1;
  let lastPage = 1;
  if (page) {
    offset = (page - 1) * LIMIT;
    currentPage = page;
  }

  if (count) {
    lastPage = Math.floor((count - 1) / LIMIT) + 1;
  }

  let sortId: number | undefined;
  switch (sort) {
    case SortOptions.TIME:
      sortId = 0;
      break;
    case SortOptions.PAY:
      sortId = 1;
      break;
    case SortOptions.HOUR:
      sortId = 2;
      break;
    case SortOptions.SHOP:
      sortId = 3;
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
          offset={offset}
          limit={LIMIT}
          currentPage={currentPage}
          lastPage={lastPage}
          keyword={keyword}
          sortId={sortId}
          address={address}
          startsAtGte={startsAtGte}
          hourlyPayGte={hourlyPayGte}
        />
      </div>
    </div>
  );
};

export default HomePage;
