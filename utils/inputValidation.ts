type validationType = "email" | "password" | "hourlyPay" | "checkingPassword";

const checkvalidation = (validationType: validationType, value: string | number): boolean => {
  if (!value) return false;
  switch (validationType) {
    case "email":
      const emailRegexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegexp.test(value.toString());
    case "password":
      const passwordRegexp = /^(?=.*[a-zA-Z가-힣!@#$%^&*()_+={}|[\]\\';:/?.,<>]).{8,16}$/;
      return passwordRegexp.test(value.toString());
    case "hourlyPay":
      const oneDigits = +value % 10;
      const tenDigits = (+value / 10) % 10;
      if (!oneDigits && !tenDigits) {
        return true;
      }
  }
  return false;
};

export default checkvalidation;
