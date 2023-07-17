"use client";

import { useState } from "react";
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
  onChange :(event:
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  data?: IData
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

}: UserInputProps) => {
  const [isEyeToggled, setIsEyeToggled] = useState(false);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e);
  };

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
            value={data?.[name]}
            className={styles.userInput}
            type={getInputType()}
            placeholder={placeholder}
            id={id}
            name={name}
            onBlur={onBlur}
            onChange={handleChangeInput}
          />
        )
        : (
          <textarea
            value={data?.[name]}
            className={styles.userTextArea}
            placeholder={placeholder}
            id={id}
            name={name}
            onChange={handleChangeInput}
            onBlur={onBlur}
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
    </div>
  );
};

export default UserInput;
