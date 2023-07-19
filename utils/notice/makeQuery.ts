import { FilterOptions } from "types/notice/filter";

interface MakeQueryParams {
  keyword?: string,
  sort?: string,
  filterOptions?: FilterOptions,
}

const makeQuery = ({
  keyword = "",
  sort = "",
  filterOptions = {
    address: new Set<number>(),
    startsAtGte: null,
    hourlyPayGte: 0,
  },
}: MakeQueryParams) => {
  let query = "";

  if (keyword) {
    query += `?keyword=${keyword}&`;

    if (sort) {
      query += `sort=${sort}&`;
    }

    if (
      filterOptions.address.size
      || filterOptions.hourlyPayGte
      || filterOptions.startsAtGte) {
      query += "filter=";
    }
  } else if (sort) {
    query += `?sort=${sort}&`;

    if (
      filterOptions.address.size
      || filterOptions.hourlyPayGte
      || filterOptions.startsAtGte) {
      query += "filter=";
    }
  } else if (
    filterOptions.address.size
    || filterOptions.hourlyPayGte
    || filterOptions.startsAtGte) {
    query += "?filter=";
  }

  if (filterOptions.address.size) {
    query += "address$";
    filterOptions.address.forEach((item) => {
      query += `${item}$`;
    });
  }

  if (filterOptions.hourlyPayGte) {
    query += `hourlyPayGte$${filterOptions.hourlyPayGte}$`;
  }

  if (filterOptions.startsAtGte) {
    const sagStr = filterOptions.startsAtGte.toISOString();
    query += `startsAtGte$${sagStr}`;
  }

  query = query.replace(/[&$]+$/, "");

  return query;
};

export default makeQuery;
