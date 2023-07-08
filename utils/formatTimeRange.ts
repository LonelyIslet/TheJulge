const formatTimeRange = (startsAt: string, workhour: number): string => {
  const startDate = new Date(startsAt);
  const endDate = new Date(startDate.getTime() + workhour * 60 * 60 * 1000);

  const year = startDate.getFullYear();
  const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
  const day = startDate.getDate().toString().padStart(2, "0");

  const startHour = startDate.getHours().toString().padStart(2, "0");
  const startMinute = startDate.getMinutes().toString().padStart(2, "0");
  const endHour = endDate.getHours().toString().padStart(2, "0");
  const endMinute = endDate.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day} ${startHour}:${startMinute} - ${endHour}:${endMinute} (${workhour}시간)`;
}

export default formatTimeRange;
