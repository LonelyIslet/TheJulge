function convertToNumber(inputString: string): number {
  // 쉼표를 없애고 모든 숫자들을 합쳐서 문자열을 숫자로 변환
  const number = Number(inputString.replace(/,/g, ""));
  return number;
}

export default convertToNumber;
