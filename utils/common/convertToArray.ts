const convertToArray = <T>(value: T | T[] | undefined) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (value !== undefined) {
    return [value];
  }

  return undefined;
};

export default convertToArray;
