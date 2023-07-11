"use client";

import { useState } from "react";
import checkValidation from "utils/inputValidation";
import { ValidationTarget } from "types/enums/inputValidation.enum";

const validationContentMap: {
  [key in ValidationTarget]: string
} = {
  EMAIL: "이메일 주소가 유효하지 않습니다.",
  PASSWORD: "비밀번호가 유효하지 않습니다.",
  PASSWORD_CONFIRM: "비밀번호가 일치하지 않습니다.",
  HOURLY_PAY: "백원 단위로 입력해주세요.",
  TEL: "유효하지 않는 전화번호 입니다.",
};

const useInputValidation = (
  validationTarget: ValidationTarget,
  value: string,
  data?: object,
): { validation: boolean, validationContent: string, handleBlur: () => void } => {
  const [validation, setValidation] = useState<boolean>(true);
  const [toggle, setToggle] = useState(false);

  const handleBlur = () => {
    if (validationTarget && !checkValidation(validationTarget, value, data)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
    setToggle(!toggle);
  };

  const validationContent: string = validationContentMap[validationTarget];

  return {
    validation, validationContent, handleBlur, toggle,
  };
};

export default useInputValidation;
