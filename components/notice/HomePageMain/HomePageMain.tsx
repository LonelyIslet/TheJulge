import { CardList, CommonLayout } from "components/common";
import { INotice } from "types/dto";
import SortButton from "components/notice/SortButton/SortButton";
import FilterButton from "components/notice/FilterButton/FilterButton";
import { FilterOptions } from "types/notice/filter";
import styles from "./HomePageMain.module.scss";

interface HomePageMainProps {
  noticeList: INotice[],
  keyword?: string,
  sortOptionId?: number,
  filterOptions?: FilterOptions,
}

const HomePageMain = ({
  noticeList,
  keyword = "",
  sortOptionId = 0,
  filterOptions,
}: HomePageMainProps) => {
  return (
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
            sortOptionId={sortOptionId}
          />
          <FilterButton
            options={filterOptions}
            keyword={keyword}
          />
        </div>
      </div>
      <div className={styles.noticeList}>
        <CardList noticeList={noticeList} />
      </div>
    </CommonLayout>
  );
};

export default HomePageMain;
