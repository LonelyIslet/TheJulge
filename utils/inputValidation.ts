import { ValidationTarget } from "types/enums/inputValidation.enum";

interface DataType {
  password?: string;
  password_confirm?: string
}

// 이메일 유효성 검사
const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// 비밀번호 유효성 검사
const passwordRegexp = /^(?=.*[a-zA-Z가-힣!@#$%^&*()_+={}|[\]\\';:/?.,<>]).{8,16}$/;
// 전화번호 유효성 검사
const telRegexp = /^01[016789]-\d{3,4}-\d{4}$/;

const checkvalidation = (
  validationTarget: ValidationTarget,
  value: string,
  data?: DataType,
): boolean => {
  const tenDigits = (+value / 10) % 10;
  const oneDigits = +value % 10;

  if (!value) return false;
  switch (validationTarget) {
    case ValidationTarget.EMAIL:
      return emailRegexp.test(value.toString());
    case ValidationTarget.PASSWORD:
      return passwordRegexp.test(value.toString());
    case ValidationTarget.TEL:
      return telRegexp.test(value.toString());
    case ValidationTarget.HOURLY_PAY:
      if (!oneDigits && !tenDigits) {
        return true;
      }
      return false;
    case ValidationTarget.PASSWORD_CONFIRM:
      if (data && data.password === data.password_confirm) {
        return true;
      }
      return false;
    default:
      return false;
  }
};

export default checkvalidation;
