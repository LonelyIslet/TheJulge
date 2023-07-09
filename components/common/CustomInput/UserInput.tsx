"use client";

import React, { useState } from "react";

import styles from "./CustomInput.module.scss";

interface UserInputProps {
  element: "text" | "textarea";
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  id: string;
  name: string;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  onChange :(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const UserInput = ({
  element, type, placeholder, id, name, onBlur, onChange,
}: UserInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
  const inputStyle = type === "number" ? `${styles["user-input"]} ${styles["input-number"]}` : styles["user-input"];

  const [eyeToggle, setEyeToggle] = useState(false);

  const handleToggle = () => {
    setEyeToggle(!eyeToggle);
  };

  const getInputType = () => {
    if (type === "password" && eyeToggle) {
      return "text";
    }
    return type;
  };

  return (
    <div className={styles.input}>
      {element === "text"
        ? <input className={inputStyle} type={getInputType()} placeholder={placeholder} id={id} name={name} ref={ref} onBlur={onBlur} onChange={(event) => { return onChange(event); }} />
        : <textarea className={styles["user-textarea"]} placeholder={placeholder} id={id} name={name} onChange={(event) => { return onChange(event); }} />}
      {type === "password" && <img src={eyeToggle ? "/images/close-eye.svg" : "/images/open-eye.svg"} onClick={handleToggle} className={styles.unit} />}
      {type === "number" && <span className={styles.unit}>원</span>}
    </div>
  );
};

export default React.forwardRef(UserInput);
