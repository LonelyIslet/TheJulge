"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  label: string
  id: string
  name: string
  onChange: any
}

const Dropdown = ({
  label, id, onChange, name,
}: DropdownProps) => {
  const [toggle, setToggle] = useState(false);
  const [inputData, setInputData] = useState<string[]>();
  const [inputValue, setInputValue] = useState<string>("");

  const divRef = useRef<HTMLDivElement>(null);

  const oneRef = useRef<HTMLDivElement>(null);

  const handleInputValue = (event) => {
    setInputValue(event.target.value);
    onChange(name, event.target.value);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handlePickData = (e) => {
    setInputValue(e.target.textContent);
    onChange(name, e.target.textContent);
  };

  const getDropdownData = async () => {
    const response = await fetch("/data/drop.json");
    const json = await response.json();
    setInputData(json);
  };

  useEffect(() => {
    getDropdownData();
  }, []);

  useEffect(() => {
    // 현재 document에서 mousedown 이벤트가 동작하면 호출되는 함수입니다.
    function handleClickOutside(event) {
      if (divRef.current && !divRef.current.contains(event.target)) {
        console.log("div 외부 클릭을 감지!");
      } else {
        // console.log(oneRef);
        // setInputValue(oneRef.current);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [oneRef]);

  return (
    <div className={styles.box}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.userInput}
        name={name}
        value={inputValue}
        onChange={(e) => { return handleInputValue(e); }}
      />
      <div ref={divRef} className={styles.container}>
        {toggle && (
        <div>
          {!inputValue
        && inputData?.data?.ward.map((list) => {
          return (
            <button
              type="button"
              onClick={handlePickData}
              className={styles.content}
              key={list}
            >
              {list}
            </button>
          );
        })}
        </div>
        )}
        {inputValue
        && inputData?.data?.ward?.filter((list) => { return list.includes(inputValue); }).map(((list) => {
          return (
            <button
              key={list}
              type="button"
              onClick={handlePickData}
              className={styles.content}
            >
              {list}
            </button>
          );
        }))}
        {!toggle && (
        <Image
          className={styles.toggle}
          src="/images/dropdown.svg"
          alt="창내림"
          width={16}
          height={16}
          onClick={handleToggle}
        />
        )}
        {toggle && (
        <Image
          className={styles.toggle}
          src="/images/Triangle.svg"
          alt="창올림"
          width={16}
          height={16}
          onClick={handleToggle}
        />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
