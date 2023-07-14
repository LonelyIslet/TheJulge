"use client";

import { Pagination } from "components/common";
import { INoticesColumn } from "types/notice/table";
import styles from "./Table.module.scss";

interface TableTemplateProps<T> {
  data: T[];
  columns: INoticesColumn<T>[];
  currentPage: number;
  lastPage: number;
  onPageClick?: (page: number) => void;
}

const Table = <T extends { id: number }>({
  data,
  columns,
  currentPage,
  lastPage,
  onPageClick = () => {},
}: TableTemplateProps<T>) => {
  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th key={column.id as number}>
                    <span>
                      {column.label}
                    </span>
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
                        <span>
                          {item[column.id]}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          lastPage={lastPage}
          onPageClick={onPageClick}
        />
      </div>
    </div>
  );
};

export default Table;
