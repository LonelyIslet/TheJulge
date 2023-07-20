import { HomePageHero, HomePageMain } from "components/notice";
import { Address1 } from "types/shop/address";
import { Sort } from "types/notice/queries";
import LIMIT from "constants/notice/options/LIMIT";
import convertToArray from "utils/convertToArray";
import getFirstValue from "utils/getFirstValue";
import getNotices from "utils/api/getNotices";
import styles from "./page.module.scss";

interface IProcessedParams {
  page?: number,
  keyword?: string,
  sort?: Sort,
  address?: Address1[],
  startsAtGte?: string,
  hourlyPayGte?: number,
}

interface HomePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

const HomePage = async ({
  searchParams,
}: HomePageProps) => {
  const processedParams: IProcessedParams = {
    page: Number(getFirstValue(searchParams.page)) || undefined,
    keyword: getFirstValue(searchParams.keyword),
    sort: getFirstValue(searchParams.sort) as Sort,
    address: convertToArray(searchParams.address) as Address1[],
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

  let currentPage = 1;
  let lastPage = 1;
  if (page) {
    currentPage = page;
  }

  if (count) {
    lastPage = Math.floor((count - 1) / LIMIT) + 1;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.top}>
        <HomePageHero />
      </div>
      <div className={styles.bottom}>
        <HomePageMain
          noticeList={noticeList}
          currentPage={currentPage}
          lastPage={lastPage}
          keyword={keyword}
          sort={sort}
          address={address}
          startsAtGte={startsAtGte}
          hourlyPayGte={hourlyPayGte}
        />
      </div>
    </div>
  );
};

export default HomePage;
