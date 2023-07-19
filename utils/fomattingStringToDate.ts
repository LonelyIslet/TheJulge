function formattingStringToDate(isoDateString: string): string {
  // ISO 형식의 날짜/시간 문자열을 JavaScript Date 객체로 변환
  const dateObj = new Date(isoDateString);

  // Date 객체에서 원하는 형식으로 날짜와 시간 정보 추출
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  // 원하는 형식으로 날짜와 시간 정보 조합
  const customFormatString = `${year}-${month}-${day} ${hours}:${minutes}`;

  return customFormatString;
}

export default formattingStringToDate;
