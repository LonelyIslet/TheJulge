import { GetNoticesProps } from "types/notice/filter";

const homeQueryStr = ({
  keyword,
  sort,
  filter,
}: GetNoticesProps) => {
  let queryString = "";

  if (keyword) {
    if (sort) {
      queryString += `?keyword=${keyword}&sort=${sort}`;
    } else {
      queryString += `?keyword=${keyword}`;
    }
  } else if (sort) {
    queryString += `?sort=${sort}`;
  }

  return queryString;
};

export default homeQueryStr;
