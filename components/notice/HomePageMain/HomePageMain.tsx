import { CardList, CommonLayout } from "components/common";
import FilterButton from "components/notice/FilterButton/FilterButton";
import SortButton from "components/notice/SortButton/SortButton";
import { INotice } from "types/dto";
import styles from "./HomePageMain.module.scss";

interface HomePageMainProps {
  noticeList: INotice[],
  keyword?: string,
  sortOptionId?: number,
  filter?: string,
}

const HomePageMain = ({
  noticeList,
  keyword = "",
  sortOptionId = 0,
  filter = "",
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
            filter={filter}
            sortOptionId={sortOptionId}
          />
          <FilterButton
            filter={filter}
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
