import LIMIT from "constants/notice/options/LIMIT";
import { Sort } from "types/notice/queries";
import { Address1 } from "types/shop/address";

interface GenerateNotciesPageQueryParams {
  page?: number;
  keyword?: string;
  sort?: Sort;
  address?: Address1[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

const generateNoticesPageQuery = ({
  page = 1,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: GenerateNotciesPageQueryParams) => {
  let queryString = "";

  const offset = (page - 1) * LIMIT;

  if (offset) {
    queryString += `page=${page}&`;
  }

  if (keyword) {
    queryString += `keyword=${keyword}&`;
  }

  if (sort && sort !== "time") {
    queryString += `sort=${sort}&`;
  }

  if (address?.length) {
    for (let i = 0; i < address.length; i += 1) {
      queryString += `address=${address[i]}&`;
    }
  }

  if (startsAtGte) {
    queryString += `startsAtGte=${startsAtGte}&`;
  }

  if (hourlyPayGte) {
    queryString += `hourlyPayGte=${hourlyPayGte}&`;
  }

  if (queryString) {
    queryString = `?${queryString}`;
    queryString = queryString.replace(/&$/, "");
  }

  return queryString;
};

export default generateNoticesPageQuery;
