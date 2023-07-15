"use client";

import Table from "components/common/Table/Table";
import { EMPLOYER_COLUMNS } from "constants/notice";
import { IEmployerNotices } from "types/notice/tables";

interface EmployerTableProps {
  applicationList: IEmployerNotices[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const EmployerTable = ({
  applicationList,
  currentPage,
  lastPage,
  onPageClick,
}: EmployerTableProps) => {
  return (
    <Table
      data={applicationList}
      columns={EMPLOYER_COLUMNS}
      currentPage={currentPage}
      lastPage={lastPage}
      onPageClick={onPageClick}
    />
  );
};

export default EmployerTable;
