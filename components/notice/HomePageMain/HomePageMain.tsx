"use client";

import { CardList, CommonLayout, Pagination } from "components/common";
import FilterButton from "components/notice/FilterButton/FilterButton";
import SortButton from "components/notice/SortButton/SortButton";
import { INotice } from "types/dto";
import styles from "./HomePageMain.module.scss";

interface HomePageMainProps {
  noticeList: INotice[],
  offset?: number,
  limit: number,
  currentPage: number,
  lastPage: number,
  keyword?: string,
  sortId?: number,
  address?: string[],
  startsAtGte?: string,
  hourlyPayGte?: number,
}

const HomePageMain = ({
  noticeList,
  offset,
  limit,
  currentPage,
  lastPage,
  keyword,
  sortId,
  address,
  startsAtGte,
  hourlyPayGte,
}: HomePageMainProps) => {
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
              offset={offset}
              limit={limit}
              keyword={keyword}
              sortId={sortId}
              address={address}
              startsAtGte={startsAtGte}
              hourlyPayGte={hourlyPayGte}
            />
            <FilterButton
              offset={offset}
              limit={limit}
              keyword={keyword}
              sortId={sortId}
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
        onPageClick={() => {}}
      />
    </>
  );
};

export default HomePageMain;
