import { FilterOptions } from "types/notice/filter";

const parseFilterToObject = (filter: string) => {
  const obj: FilterOptions = {
    address: new Set(),
    startsAtGte: null,
    hourlyPayGte: 0,
  };

  const pairs = filter.split("$");

  for (let i = 0; i < pairs.length; i += 1) {
    if (pairs[i] === "address") {
      i += 1;
      while (i < pairs.length && !Number.isNaN(Number(pairs[i]))) {
        obj.address.add(Number(pairs[i]));
        i += 1;
      }
      i -= 1;
    } else if (pairs[i] === "hourlyPayGte") {
      i += 1;
      obj.hourlyPayGte = Number(pairs[i]);
    } else if (pairs[i] === "startsAtGte") {
      i += 1;
      obj.startsAtGte = new Date(pairs[i]);
    }
  }

  return obj;
};

export default parseFilterToObject;
