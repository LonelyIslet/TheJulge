"use client";

import useDropdown from "hooks/useDropdown";
import Image from "next/image";
import React, { useState, useRef } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  label: string
  id: string
  name: string
  onChange: (name:string, value:string) => void
}

const Dropdown = ({
  label, id, onChange, name,
}: DropdownProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const divRef = useRef<HTMLDivElement>(null);
  const { isOut, setIsOut, fetchData } = useDropdown(divRef);

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(name, event.target.value);
  };

  const handlePickData = ((event: React.MouseEvent<HTMLButtonElement>) => {
    setInputValue((event.target as HTMLElement).textContent as string);
    onChange(name, (event.target as HTMLElement).textContent as string);
  });

  const handleToggle = () => {
    setIsOut((prev) => { return !prev; });
  };

  return (
    <div className={styles.box} ref={divRef}>
      <label className={styles.label} htmlFor={id}>{label}</label>
      <input
        id={id}
        className={styles.userInput}
        name={name}
        value={inputValue}
        onChange={(e) => { return handleInputValue(e); }}
      />
      <div className={styles.container}>
        {!isOut && (
        <div>
          {!inputValue
          && fetchData
          && fetchData.data.ward.map((list:string) => {
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
        {!isOut
        && inputValue
        && fetchData
        && fetchData.data.ward.filter((list) => { return list.includes(inputValue); })
          .map(((list: string) => {
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
        {!isOut && (
        <Image
          className={styles.toggle}
          src="/images/dropdown.svg"
          alt="창내림"
          width={16}
          height={16}
          onClick={handleToggle}
          id="1"
        />
        )}
        {isOut && (
        <Image
          className={styles.toggle}
          src="/images/Triangle.svg"
          alt="창올림"
          width={16}
          height={16}
          onClick={handleToggle}
          id="2"
        />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
