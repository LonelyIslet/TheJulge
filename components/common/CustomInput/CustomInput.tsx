"use client";

import { useRef } from "react";
import useInputValidation from "hooks/useInputValidation";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import UserInput from "./UserInput";
import styles from "./CustomInput.module.scss";

interface ValidationType {
  email: string,
  password: string,
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
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) => void;
  essential?: boolean;
  validationTarget?: ValidationTarget
  data?: ValidationType;
}

const CustomInput = ({
  element, label, type, placeholder, essential, id, name, validationTarget, onChange, data,
}: CustomInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { validation, validationContent, handleBlur } = useInputValidation(
    validationTarget,
    inputRef.current?.value as string,
    data as object,
  );

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
      {element === "text" && !validation && <p className={styles.validation}>{validationContent}</p>}
    </div>
  );
};

export default CustomInput;
