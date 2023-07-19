import { GetNoticesProps } from "types/notice/filter";

const parseQuery = ({
  keyword,
  sort,
  filter,
}: GetNoticesProps) => {
  let queryString = "";

  if (keyword || sort || filter) {
    queryString += "?";
  }

  if (keyword) {
    queryString += `keyword=${keyword}&`;
  }

  if (sort) {
    queryString += `sort=${sort}&`;
  }

  if (filter) {

  }

  queryString = queryString.replace(/&$/, "");

  return queryString;
};

export default parseQuery;
