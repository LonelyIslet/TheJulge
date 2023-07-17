import { ISortOption } from "types/notice/options";

const SORT_OPTIONS: ISortOption[] = [
  { id: 0, option: "time", label: "마감임박순" },
  { id: 1, option: "pay", label: "시급많은순" },
  { id: 2, option: "hour", label: "시간적은순" },
  { id: 3, option: "shop", label: "가나다순" },
];

export default SORT_OPTIONS;
