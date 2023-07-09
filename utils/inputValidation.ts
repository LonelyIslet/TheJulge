type ValidationType = "email" | "password" | "hourlyPay" | "checkingPassword";

const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegexp = /^(?=.*[a-zA-Z가-힣!@#$%^&*()_+={}|[\]\\';:/?.,<>]).{8,16}$/;

const checkvalidation = (validationType: ValidationType, value: string | number): boolean => {
  const tenDigits = (+value / 10) % 10;
  const oneDigits = +value % 10;
  if (!value) return false;
  switch (validationType) {
    case "email":
      return emailRegexp.test(value.toString());
    case "password":
      return passwordRegexp.test(value.toString());
    case "hourlyPay":
      if (!oneDigits && !tenDigits) {
        return true;
      }
      break;
    default:
  }
  return false;
};

export default checkvalidation;
