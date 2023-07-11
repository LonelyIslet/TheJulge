import { Pagination } from "components/common";
import { IColumn } from "types/post/table";
import styles from "./TableTemplate.module.scss";

interface TableTemplateProps<T> {
  data: T[];
  columns: IColumn<T>[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

// eslint-disable-next-line @typescript-eslint/comma-dangle
const TableTemplate = <T extends { id: number }>({
  data,
  columns,
  currentPage,
  lastPage,
  onPageClick,
}: TableTemplateProps<T>) => {
  return (
    <table className={styles.tableContainer}>
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
      <Pagination
        currentPage={currentPage}
        lastPage={lastPage}
        onPageClick={onPageClick}
      />
    </table>
  );
};

export default TableTemplate;
