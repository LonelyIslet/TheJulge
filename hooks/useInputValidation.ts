"use client";

import { useState } from "react";
import inputValidation from "utils/inputValidation";
import { ValidationTarget } from "types/enums/inputValidation.enum";

interface ICountValidation {
  email: number;
  password: number;
  password_confirm: number;
}

const validationContentMap: {
  [key in ValidationTarget]: string
} = {
  EMAIL: "이메일 주소가 유효하지 않습니다.",
  PASSWORD: "비밀번호가 유효하지 않습니다.",
  PASSWORD_CONFIRM: "비밀번호가 일치하지 않습니다.",
  HOURLY_PAY: "백원 단위로 입력해주세요.",
  TEL: "유효하지 않는 전화번호 입니다.",
  ESSENTIAL: "필수 항목입니다.",
};

const useInputValidation = (
  validationTarget: ValidationTarget,
  value: string,
  data?: object,
  name?: string,
  setCountValidation?:React.Dispatch<React.SetStateAction<ICountValidation>>,
  essential?: boolean,
) => {
  const [validation, setValidation] = useState<boolean>(false);
  const [toggle, setToggle] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (ValidationTarget && setCountValidation && name) {
      setCountValidation((prev) => {
        return {
          ...prev,
          [name as keyof ICountValidation]: prev[name as keyof ICountValidation] + 1,
        };
      });
    }
    if (validationTarget && !inputValidation(validationTarget, value, data)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
    setToggle(!toggle);
  };

  const validationContent: string = validationContentMap[validationTarget];

  // if (essential && value?.length === 0) {
  //   validationContent = validationContentMap.ESSENTIAL;
  // }

  return {
    validation, validationContent, handleBlur, toggle,
  };
};

export default useInputValidation;
