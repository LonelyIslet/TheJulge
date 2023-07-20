const getBgColorClass = (percentage: number): string => {
  if (percentage > 75) {
    return "bg-75-100";
  }

  if (percentage > 50) {
    return "bg-50-75";
  }

  if (percentage > 25) {
    return "bg-25-50";
  }

  return "bg-0-25";
};

export default getBgColorClass;
