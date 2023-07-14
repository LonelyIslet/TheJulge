"use client";

import { Table } from "components/common";
import { EMPLOYER_COLUMNS } from "constants/notice/table";
import { IEmployerNotices } from "types/notice/table";

interface EmployerTableProps {
  data: IEmployerNotices[];
  currentPage: number;
  lastPage: number;
  onPageClick?: (page: number) => void;
}
const EmployerTable = ({
  data,
  currentPage,
  lastPage,
  onPageClick = () => {},
}: EmployerTableProps) => {
  return (
    <Table
      data={data}
      columns={EMPLOYER_COLUMNS}
      currentPage={currentPage}
      lastPage={lastPage}
      onPageClick={onPageClick}
    />
  );
};

export default EmployerTable;
