const calculatePercentage = (hourlyPay: number, originalHourlyPay: number) => {
  const percentage = ((hourlyPay - originalHourlyPay) / originalHourlyPay) * 100;
  const roundedPercentage = Math.round(percentage / 5) * 5;
  return roundedPercentage;
};

export default calculatePercentage;
