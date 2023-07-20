const formatStringNumberWithCommas = (value: string): string => {
  const number = Number(value);
  const formattedValue = number.toLocaleString();

  return formattedValue;
};

export default formatStringNumberWithCommas;
