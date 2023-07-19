const addCommasToString = (value: string) => {
  const temp = value.replace(/^0+/, "");
  const parts = temp.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};

export default addCommasToString;
