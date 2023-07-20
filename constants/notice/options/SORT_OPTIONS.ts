import { Sort } from "types/notice/queries";

const SORT_OPTIONS: Record<Sort, string> = {
  time: "마감임박순",
  pay: "시급많은순",
  hour: "시간적은순",
  shop: "가나다순",
};

export default SORT_OPTIONS;
