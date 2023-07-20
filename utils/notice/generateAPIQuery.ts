interface GenerateAPIQueryParams {
  offset?: number,
  limit: number,
  keyword?: string,
  sort?: string,
  address?: string[],
  startsAtGte?: string,
  hourlyPayGte?: number,
}

const generateAPIQuery = ({
  offset,
  limit,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: GenerateAPIQueryParams) => {
  let queryString = "";

  if (offset) {
    queryString += `offset=${offset}&`;
  }

  if (limit) {
    queryString += `limit=${limit}&`;
  }

  if (keyword) {
    queryString += `keyword=${keyword}&`;
  }

  if (sort) {
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

export default generateAPIQuery;
