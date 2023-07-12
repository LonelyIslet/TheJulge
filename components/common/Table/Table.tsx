import { Pagination } from "components/common";
import { IPostsColumn } from "types/post/table";
import styles from "./Table.module.scss";

interface TableTemplateProps<T> {
  data: T[];
  columns: IPostsColumn<T>[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const Table = <T extends { id: number }>({
  data,
  columns,
  currentPage,
  lastPage,
  onPageClick,
}: TableTemplateProps<T>) => {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => {
              return (
                <th key={column.id as number}>
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.id}>
                {columns.map((column) => {
                  return (
                    <td key={column.id as number}>
                      {item[column.id]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageClick={onPageClick}
      />
    </div>
  );
};

export default Table;
