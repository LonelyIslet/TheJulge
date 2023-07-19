"use client";

import { useEffect, useState } from "react";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import useInputValidation from "hooks/useInputValidation";
import UserInput from "./UserInput";
import styles from "./CustomInput.module.scss";

interface ICountValidation {
  [key: string]: number;
}

interface IData {
  [key: string]: string | number;
}

interface CustomInputProps {
  element: "text" | "textarea";
  type?: React.HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  validationTarget?: ValidationTarget;
  data: IData;
  rendering?: boolean;
  countValidation?: ICountValidation
  setCountValidation?: React.Dispatch<React.SetStateAction<object>>;
}

const CustomInput = ({
  element,
  label,
  type,
  placeholder,
  required,
  id,
  name,
  validationTarget,
  onChange,
  data,
  rendering,
  countValidation,
  setCountValidation,
}: CustomInputProps) => {
  const {
    validation, validationContent, handleBlur, toggle,
  } = useInputValidation(
    validationTarget as ValidationTarget,
    data[name],
    name,
    required,
    rendering,
    setCountValidation,
    data,
    element,
  );

  const [change, setChange] = useState(false);

  useEffect(() => {
    setChange(!change);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle, rendering]);
  return (
    <div className={styles.box}>
      <label className={styles.label} htmlFor={id}>{required ? `${label}*` : label}</label>
      <UserInput
        element={element}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={onChange}
        data={data}
      />
      {validationTarget && !!countValidation?.[name] && !validation && (
        <p className={change ? `${styles.validation}` : `${styles.swing}`}>{validationContent}</p>
      )}
    </div>
  );
};

export default CustomInput;
