import { ADDRESS } from "constants/dropdown/dropdownData";
import { GetNoticesParams } from "types/notice/filter";
import parseFilterToObject from "utils/notice/parseFilterToObject";

const parseQuery = ({
  keyword,
  sort,
  filter,
}: GetNoticesParams) => {
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
    const options = parseFilterToObject(filter);

    if (options.address.size) {
      options.address.forEach((id) => {
        queryString += `address=${ADDRESS[id]}&`;
      });
    }

    if (options.hourlyPayGte) {
      queryString += `hourlyPayGte=${options.hourlyPayGte}&`;
    }

    if (options.startsAtGte) {
      const startsAtGte = options.startsAtGte.toISOString();
      queryString += `startsAtGte=${startsAtGte}`;
    }
  }

  queryString = queryString.replace(/&$/, "");

  return queryString;
};

export default parseQuery;
