import { Table } from "components/common";
import { EmployeePosts, IPostsColumn } from "types/post/table";

interface EmployeeTableProps {
  data: EmployeePosts[];
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
  const columns: IPostsColumn<EmployeePosts>[] = [
    { id: "store", label: "가게" },
    { id: "date", label: "일자" },
    { id: "hourlyWage", label: "시급" },
    { id: "state", label: "상태" },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      currentPage={currentPage}
      lastPage={lastPage}
      onPageClick={onPageClick}
    />
  );
};

export default EmployeeTable;
