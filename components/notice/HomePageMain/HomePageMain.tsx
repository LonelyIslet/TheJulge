"use client";

import { useRouter } from "next/navigation";
import { CardList, CommonLayout, Pagination } from "components/common";
import FilterButton from "components/notice/FilterButton/FilterButton";
import SortButton from "components/notice/SortButton/SortButton";
import { INotice } from "types/dto";
import { Sort } from "types/notice/queries";
import { Address1 } from "types/shop/address";
import generateNoticesPageQuery from "utils/notice/generateNoticesPageQuery";
import styles from "./HomePageMain.module.scss";

interface HomePageMainProps {
  noticeList: INotice[],
  currentPage: number,
  lastPage: number,
  keyword?: string,
  sort?: Sort,
  address?: Address1[],
  startsAtGte?: string,
  hourlyPayGte?: number,
}

const HomePageMain = ({
  noticeList,
  currentPage,
  lastPage,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: HomePageMainProps) => {
  const router = useRouter();

  const handlePageClick = (page: number) => {
    const queryString = generateNoticesPageQuery({
      page,
      keyword,
      sort,
      address,
      startsAtGte,
      hourlyPayGte,
    });

    if (keyword) {
      router.push(`/notices${queryString}`);
    } else {
      router.push(queryString);
    }
  };

  return (
    <>
      <CommonLayout position="below">
        <div className={styles.firstLine}>
          {keyword
            ? (
              <h2>
                <span className={styles.keyword}>{keyword}</span>
                에 대한 공고 목록
              </h2>
            )
            : (
              <h2>
                전체 공고
              </h2>
            )}
          <div className={styles.buttonContainer}>
            <SortButton
              keyword={keyword}
              sort={sort}
              address={address}
              startsAtGte={startsAtGte}
              hourlyPayGte={hourlyPayGte}
            />
            <FilterButton
              keyword={keyword}
              sort={sort}
              address={address}
              startsAtGte={startsAtGte}
              hourlyPayGte={hourlyPayGte}
            />
          </div>
        </div>
        <div className={styles.noticeList}>
          <CardList noticeList={noticeList} />
        </div>
      </CommonLayout>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageClick={handlePageClick}
      />
    </>
  );
};

export default HomePageMain;
