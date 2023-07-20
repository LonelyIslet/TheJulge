import { FilterOptions } from "types/notice/filter";

const calcOptions = (filterOptions: FilterOptions) => {
  let num = 0;

  if (filterOptions.address) {
    num += filterOptions.address.size;
  }

  if (filterOptions.startsAtGte) {
    num += 1;
  }

  if (filterOptions.hourlyPayGte) {
    num += 1;
  }

  return num;
};

export default calcOptions;
