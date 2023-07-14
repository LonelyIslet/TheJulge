"use client";

import { Table } from "components/common";
import { EMPLOYEE_COLUMNS } from "constants/notice/table";
import { IEmployeeNotices } from "types/notice/table";

interface EmployeeTableProps {
  data: IEmployeeNotices[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const EmployeeTable = ({
  data,
  currentPage,
  lastPage,
  onPageClick,
}: EmployeeTableProps) => {
  return (
    <Table
      data={data}
      columns={EMPLOYEE_COLUMNS}
      currentPage={currentPage}
      lastPage={lastPage}
      onPageClick={onPageClick}
    />
  );
};

export default EmployeeTable;
