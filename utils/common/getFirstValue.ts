const getFirstValue = <T>(input: T | T[]) => {
  if (Array.isArray(input)) {
    return input[0];
  }
  return input;
};

export default getFirstValue;
