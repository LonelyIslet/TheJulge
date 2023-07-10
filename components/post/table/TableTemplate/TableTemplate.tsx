import { Pagination } from "components/common";
import { IListItems } from "types/post/post";
import styles from "./TableTemplate.module.scss";

interface TableTemplateProps {
  headerItems?: string[];
  listItems?: IListItems[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const TableTemplate = ({
  headerItems = ["-", "-", "-", "-"],
  listItems = [],
  currentPage,
  lastPage,
  onPageClick,
}: TableTemplateProps) => {
  return (
    <>
      <ul className={styles.list}>
        <li className={styles.item}>
          {headerItems.map((item) => {
            return (
              <p key={item}>{item}</p>
            );
          })}
        </li>
        {listItems.map((item) => {
          return (
            <li key={item.id} className={styles.item}>
              <p>
                {item.item1}
              </p>
              <p>
                {item.item2}
              </p>
              <p>
                {item.item3}
              </p>
              <div>
                {item.item4}
              </div>
            </li>
          );
        })}
      </ul>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageClick={onPageClick}
      />
    </>
  );
};

export default TableTemplate;
