"use client";

import { useEffect, useRef, useState } from "react";
import useInputValidation from "hooks/useInputValidation";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import UserInput from "./UserInput";
import styles from "./CustomInput.module.scss";

interface IValidationType {
  email?: string,
  password?: string,
  password_confirm?: string
}

interface CustomInputProps {
  element: "text" | "textarea";
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  onChange: (event:
  React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement>) => void
  essential?: boolean;
  validationTarget?: ValidationTarget
  data?: IValidationType;
  rendering?: boolean;
  buttonClickCount?: number
}

const CustomInput = ({
  element,
  label,
  type,
  placeholder,
  essential,
  id,
  name,
  validationTarget,
  onChange,
  data,
  rendering,
  buttonClickCount,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    validation, validationContent, handleBlur, toggle,
  } = useInputValidation(
    validationTarget as ValidationTarget,
    inputRef.current?.value as string,
    data as object,
  );
  const [change, setChange] = useState(false);

  useEffect(() => {
    setChange(!change);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, rendering]);

  return (
    <div className={styles.box}>
      <label className={styles.label} htmlFor={id}>{essential ? `${label}*` : label}</label>
      <UserInput
        element={element}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        ref={inputRef}
        onBlur={handleBlur}
        onChange={onChange}
      />
      {element === "text" && (!!buttonClickCount && !validation) && <p className={change ? `${styles.validation}` : `${styles.swing}`}>{validationContent}</p>}
    </div>
  );
};

export default CustomInput;
