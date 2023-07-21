function convertToISODate(inputString: string) {
  // 입력 문자열에서 날짜와 시간 정보 추출
  const datePart = inputString.split(" ")[0];
  const timePart = inputString.split(" ")[1];

  // 날짜와 시간을 적절한 포맷으로 조합하여 ISO 형식으로 변환
  const isoString = `${datePart}T${timePart}:00.000Z`;

  return isoString;
}

export default convertToISODate;
