"use client";

import { useState } from "react";
import checkValidation from "utils/inputValidation";

type validationType = "email" | "password" | "hourlyPay" | "checkingPassword" | undefined;

interface dataType {
  password?: string;
  checkingPassword?: string
}

const useInputValidation = (validationType: validationType, value: string | number, data: dataType): { validation: boolean, validationContent: string, handleBlur: () => void } => {
  const [validation, setValidation] = useState<boolean>(true);

  const handleBlur = () => {
    if (validationType && !checkValidation(validationType, value)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  let validationContent = "";
  if (!validation && validationType === "email") {
    validationContent = "이메일 주소가 유효하지 않습니다.";
  } else if (!validation && validationType === "password") {
    validationContent = "비밀번호가 유효하지 않습니다.";
  } else if (!validation && validationType === "hourlyPay") {
    validationContent = "백원 단위로 입력해주세요.";
  } else if (data && !validation && validationType === "checkingPassword" && data.password !== data.checkingPassword) {
    validationContent = "비밀번호가 일치하지 않습니다.";
  }

  return { validation, validationContent, handleBlur };
};

export default useInputValidation;
