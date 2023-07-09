"use client";

import React, { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = () => {
  const [toggle, setToggle] = useState(false);
  const [inputData, setInputData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getDropdownData = async () => {
    const response = await fetch("/data/drop.json");
    const json = await response.json();
    setInputData(json);
  };

  useEffect(() => {
    getDropdownData();
  }, [toggle]);

  console.log(inputData);
  return (
    <div>
      {/* <label className={styles.label} htmlFor={id}>{essential ? `${label}*` : label}</label> */}
      <input
        onClick={() => { return setToggle(!toggle); }}
        value={inputValue}
        onChange={(e) => { return setInputValue(e.target.value); }}
      />
      {toggle && (
      <ul>
        {!inputValue && inputData?.data?.ward.map((list) => { return <li key={list.ward}>{list}</li>; })}
      </ul>
      )}
    </div>
  );
};

export default Dropdown;
