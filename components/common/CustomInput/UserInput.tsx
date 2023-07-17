"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./CustomInput.module.scss";

interface IData {
  [key: string]: string;
}

interface UserInputProps {
  element: "text" | "textarea";
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  id: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange: (event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  data: IData
}

const UserInput = ({
  element,
  type,
  placeholder,
  id,
  name,
  onBlur,
  onChange,
  data,
}: UserInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const inputStyle = type === "number" ? `${styles.userInput} ${styles.inputNumber}` : styles.userInput;

  const [isEyeToggled, setIsEyeToggled] = useState(false);

  const handleToggle = () => {
    setIsEyeToggled(!isEyeToggled);
  };

  const getInputType = () => {
    if (type === "password" && isEyeToggled) {
      return "text";
    }
    return type;
  };

  return (
    <div className={styles.input}>
      {element === "text"
        ? (
          <input
            className={inputStyle}
            type={getInputType()}
            placeholder={placeholder}
            id={id}
            name={name}
            ref={ref}
            onBlur={onBlur}
            onChange={(event) => { return onChange(event); }}
            defaultValue={data?.[name]}
          />
        )
        : (
          <textarea
            className={styles.userTextArea}
            placeholder={placeholder}
            id={id}
            name={name}
            onChange={(event) => { return onChange(event); }}
            onBlur={onBlur}
            defaultValue={data?.[name]}
          />
        )}
      {type === "password" && (
        <Image
          src={isEyeToggled ? "/images/close-eye.svg"
            : "/images/open-eye.svg"}
          onClick={handleToggle}
          className={styles.unit}
          alt="비밀번호 표시/숨김 버튼"
          width={16}
          height={16}
        />
      )}
      {type === "number" && <span className={styles.unit}>원</span>}
    </div>
  );
};

export default React.forwardRef(UserInput);
