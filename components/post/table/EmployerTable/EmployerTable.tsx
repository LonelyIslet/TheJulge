import { Table } from "components/post/table";
import { EmployerPosts, IPostsColumn } from "types/post/table";

interface EmployerTableProps {
  data: EmployerPosts[];
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const EmployerTable = ({
  data,
  currentPage,
  lastPage,
  onPageClick,
}: EmployerTableProps) => {
  const columns: IPostsColumn<EmployerPosts>[] = [
    { id: "name", label: "신청자" },
    { id: "intro", label: "소개" },
    { id: "phoneNumber", label: "전화번호" },
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

export default EmployerTable;
