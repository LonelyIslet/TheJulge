"use client";

import useDropdown from "hooks/useDropdown";
import Image from "next/image";
import React, { useState, useRef } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  category: "shop" | "location"
  label: string
  essential?: string
  id: string
  name: string
  onChange: (name:string, value:string) => void
}

const Dropdown = ({
  category, label, id, onChange, name, essential,
}: DropdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = useState<string>("");
  const { toggle, setToggle, fetchData } = useDropdown(divRef, category);

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onChange(name, event.target.value);
  };

  const handlePickData = ((event: React.MouseEvent<HTMLButtonElement>) => {
    setInputValue((event.target as HTMLElement).textContent as string);
    onChange(name, (event.target as HTMLElement).textContent as string);
  });

  const handleToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    setToggle(!toggle);
  };

  return (
    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,
    jsx-a11y/no-static-element-interactions */
    <div className={styles.box} ref={divRef} onClick={handleToggle}>
      <label className={styles.label} htmlFor={id}>{essential ? `${label}*` : label}</label>
      <input
        id={id}
        className={styles.userInput}
        name={name}
        value={inputValue}
        onChange={(e) => { return handleInputValue(e); }}
        placeholder="선택"
      />
      {toggle && (
        <Image
          className={styles.toggle}
          src="/images/dropdown.svg"
          alt="창내림"
          width={16}
          height={16}
          onClick={handleToggle}
          id="toggle"
        />
      )}
      {!toggle && (
        <Image
          className={styles.toggle}
          src="/images/Triangle.svg"
          alt="창올림"
          width={16}
          height={16}
          onClick={handleToggle}
          id="toggle"
        />
      )}
      <div>
        {toggle && (
        <div className={styles.container}>
          {!inputValue
          && fetchData
          && fetchData.data.map((list:string) => {
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
        <div className={styles.container}>
          {toggle
        && inputValue
        && fetchData
        && fetchData.data.filter((list) => { return list.includes(inputValue); })
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
        </div>

      </div>
    </div>
  );
};

export default Dropdown;
