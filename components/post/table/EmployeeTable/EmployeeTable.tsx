import { TableTemplate } from "components/post/table";
import { EmployeePostData, IColumn } from "types/post/table";

interface EmployeeTableProps {
  data: EmployeePostData[];
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
  const columns: IColumn<EmployeePostData>[] = [
    { id: "store", label: "가게" },
    { id: "date", label: "일자" },
    { id: "hourlyWage", label: "시급" },
    { id: "state", label: "상태" },
  ];

  return (
    <TableTemplate
      data={data}
      columns={columns}
      currentPage={currentPage}
      lastPage={lastPage}
      onPageClick={onPageClick}
    />
  );
};

export default EmployeeTable;
