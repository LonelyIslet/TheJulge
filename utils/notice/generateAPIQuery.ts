import LIMIT from "constants/notice/options/LIMIT";

interface GenerateAPIQueryParams {
  offset?: number;
  keyword?: string;
  sort?: string;
  address?: string[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

const generateAPIQuery = ({
  offset = 0,
  keyword,
  sort = "time",
  address = [],
  startsAtGte,
  hourlyPayGte,
}: GenerateAPIQueryParams): string => {
  let queryString = `offset=${offset}&limit=${LIMIT}&`;

  if (keyword) {
    queryString += `keyword=${keyword}&`;
  }

  if (sort) {
    queryString += `sort=${sort}&`;
  }

  address.forEach((addr) => {
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

export default generateAPIQuery;
