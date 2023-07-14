import { IEmployerNotices, IEmployeeNotices, INoticesColumn } from "types/notice/table";

export const EMPLOYER_COLUMNS: INoticesColumn<IEmployerNotices>[] = [
  { id: "name", label: "신청자" },
  { id: "intro", label: "소개" },
  { id: "phoneNumber", label: "전화번호" },
  { id: "state", label: "상태" },
];

export const EMPLOYEE_COLUMNS: INoticesColumn<IEmployeeNotices>[] = [
  { id: "store", label: "가게" },
  { id: "date", label: "일자" },
  { id: "hourlyPay", label: "시급" },
  { id: "state", label: "상태" },
];
