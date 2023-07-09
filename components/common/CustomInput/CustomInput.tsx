"use client";

import { useRef } from "react";
import useInputValidation from "hooks/useInputValidation";
import InputBox from "./InputBox";
import UserInput from "./UserInput";

import styles from "./CustomInput.module.scss";

type validationType = {
  email: string,
  password: string,
  checkingPassword?: string
};

interface CustomInputProps {
  element: "text" | "textarea";
  type: React.HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
  essential?: boolean;
  validationType?: "email" | "password" | "hourlyPay" | "checkingPassword";
  data?: validationType
}

const CustomInput = ({
  element, label, type, placeholder, essential, id, name, validationType, onChange, data,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { validation, validationContent, handleBlur } = useInputValidation(validationType, inputRef.current?.value as string, data as object);

  return (
    <InputBox>
      <label className={styles.label} htmlFor={id}>{essential ? `${label}*` : label}</label>
      <UserInput element={element} placeholder={placeholder} type={type} id={id} name={name} ref={inputRef} onBlur={handleBlur} onChange={onChange} />
      {element === "text" && !validation && <p className={styles.validation}>{validationContent}</p>}
    </InputBox>
  );
};

export default CustomInput;
