import { IEmployeeNotices, INoticesColumn } from "types/notice/tables";

const EMPLOYEE_COLUMNS: INoticesColumn<IEmployeeNotices>[] = [
  { id: "store", label: "가게" },
  { id: "date", label: "일자" },
  { id: "hourlyPay", label: "시급" },
  { id: "state", label: "상태" },
];

export default EMPLOYEE_COLUMNS;
