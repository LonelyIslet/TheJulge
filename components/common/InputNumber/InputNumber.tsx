"use client";

import { useState, useEffect } from "react";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import useInputValidation from "hooks/useInputValidation";
import styles from "./InputNumber.module.scss";

interface ICountValidation {
  [key: string]: number;
}
interface IData {
  [key: string]: string | number;
}

interface CustomInputProps {
  label: string;
  placeholder?: string;
  id: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  validationTarget?: ValidationTarget;
  data?: IData;
  rendering?: boolean;
  countValidation?: ICountValidation
  setCountValidation?: React.Dispatch<React.SetStateAction<object>>;
  unit?: string
}

const InputNumber = ({
  label,
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
  unit,
}: CustomInputProps) => {
  const [value, setValue] = useState("");
  const {
    validation, validationContent, handleBlur, toggle,
  } = useInputValidation(
    validationTarget as ValidationTarget,
    value,
    name,
    required,
    rendering,
    setCountValidation,
    data as IData,
  );

  const [change, setChange] = useState(false);

  const changeEnteredNum = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(Number(e.target.value.replace(/[^0-9]/g, "")).toLocaleString());
    onChange(e);
  };

  useEffect(() => {
    setChange(!change);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (data?.[name]) {
      setValue(Number((data?.[name] as string).replace(/[^0-9]/g, "")).toLocaleString());
    }
  }, [toggle, rendering, data, name]);

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={id}>{required ? `${label}*` : label}</label>
      <div className={styles.input}>
        <input
          className={styles.userInput}
          id={id}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={changeEnteredNum}
          onBlur={handleBlur}
          inputMode="numeric"
        />
        <span className={styles.unit}>{unit}</span>
      </div>
      {validationTarget && !!countValidation?.[name as keyof ICountValidation] && !validation && (
        <p className={change ? `${styles.validation}` : `${styles.swing}`}>{validationContent}</p>
      )}
    </div>
  );
};

export default InputNumber;
