import { IEmployerNotices, INoticesColumn } from "types/notice/tables";

const EMPLOYER_COLUMNS: INoticesColumn<IEmployerNotices>[] = [
  { id: "name", label: "신청자" },
  { id: "intro", label: "소개" },
  { id: "phoneNumber", label: "전화번호" },
  { id: "state", label: "상태" },
];

export default EMPLOYER_COLUMNS;
