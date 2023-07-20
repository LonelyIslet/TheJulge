import LIMIT from "constants/notice/options/LIMIT";

interface GenerateAPIQueryParams {
  offset?: number,
  keyword?: string,
  sort?: string,
  address?: string[],
  startsAtGte?: string,
  hourlyPayGte?: number,
}

const generateAPIQuery = ({
  offset,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: GenerateAPIQueryParams) => {
  let queryString = "";

  if (offset) {
    queryString += `offset=${offset}&`;
  } else {
    queryString += "offset=0&";
  }

  queryString += `limit=${LIMIT}&`;

  if (keyword) {
    queryString += `keyword=${keyword}&`;
  }

  if (sort) {
    queryString += `sort=${sort}&`;
  } else {
    queryString += "sort=time";
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

export default generateAPIQuery;
