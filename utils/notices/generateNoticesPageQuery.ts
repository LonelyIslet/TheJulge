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
}: GenerateNotciesPageQueryParams): string => {
  let queryString = "";

  if (page > 1) {
    queryString += `page=${page}&`;
  }

  if (keyword) {
    queryString += `keyword=${keyword}&`;
  }

  if (sort && sort !== "time") {
    queryString += `sort=${sort}&`;
  }

  address?.forEach((addr) => {
    queryString += `address=${addr}&`;
  });

  if (startsAtGte) {
    queryString += `startsAtGte=${startsAtGte}&`;
  }

  if (hourlyPayGte) {
    queryString += `hourlyPayGte=${hourlyPayGte}&`;
  }

  queryString = `?${queryString.replace(/&$/, "")}`;

  return queryString;
};

export default generateNoticesPageQuery;
