"use client";

import Table from "components/common/Table/Table";
import EMPLOYEE_COLUMNS from "constants/notice/tables/EMPLOYEE_COLUMNS";
import { IEmployeeNotices } from "types/notice/tables";

interface EmployeeTableProps {
  applicationList: IEmployeeNotices[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const EmployeeTable = ({
  applicationList,
  currentPage,
  lastPage,
  onPageClick,
}: EmployeeTableProps) => {
  return (
    <Table
      data={applicationList}
      columns={EMPLOYEE_COLUMNS}
      currentPage={currentPage}
      lastPage={lastPage}
      onPageClick={onPageClick}
    />
  );
};

export default EmployeeTable;
