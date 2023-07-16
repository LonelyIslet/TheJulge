"use client";

import { useState } from "react";
import styles from "./InputNumber.module.scss";

const InputNumber = ({ id, label, essential }) => {
  const [value, setValue] = useState("");

  const changeEnteredNum = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value.replace(/[^0-9]/g, "")).toLocaleString());
  };

  return (
    <div className={styles.container}>
      <label htmlFor="id">테시트</label>
      <input id="id" value={value} onChange={changeEnteredNum} />
    </div>
  );
};

export default InputNumber;
