"use client";

import { useEffect, useState } from "react";
import inputValidation from "utils/inputValidation";
import { ValidationTarget } from "types/enums/inputValidation.enum";

interface IData {
  [key: string]: string | number
}

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
  PHONE: "유효하지 않은 전화번호 입니다.",
  REQUIRED: "필수 항목입니다.",
  DATE: "YYYY-MM-dd hh:mm 형식으로 작성해주세요",
};

const useInputValidation = (
  validationTarget: ValidationTarget,
  value: string,
  name?: string,
  required?: boolean,
  rendering?: boolean,
  setCountValidation?: React.Dispatch<React.SetStateAction<ICountValidation>>,
  data?: IData,
  element?: "text" | "textarea",
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
    if (element === "textarea" && data && data[name as keyof IData] && (data[name as keyof IData] as string).length) {
      setValidation(true);
    }
    setToggle(!toggle);
  };

  useEffect(() => {
    if (validationTarget && !inputValidation(validationTarget, value, data)) {
      setValidation(false);
    } else {
      setValidation(true);
    }
    if (element === "textarea" && data && data[name as keyof IData] && (data[name as keyof IData] as string).length) {
      setValidation(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rendering]);

  const validationContent: string = value?.length === 0 && required
    ? validationContentMap.REQUIRED
    : validationContentMap[validationTarget];

  return {
    validation, validationContent, handleBlur, toggle,
  };
};

export default useInputValidation;
