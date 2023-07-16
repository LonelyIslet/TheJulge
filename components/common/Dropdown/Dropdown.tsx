"use client";

import useDropdown from "hooks/useDropdown";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  type: "address" | "category"
  label: string
  id: string
  name: string
  essential?: boolean
  onChange: (event:
  React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> |
  React.MouseEvent<HTMLButtonElement>) => void
}

const Dropdown = ({
  type,
  label,
  id,
  onChange,
  name,
  essential,
}: DropdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [checkValidaiton, setCheckValidation] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");
  const { toggle, setToggle, fetchData } = useDropdown(divRef, type);

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setInputValue(event.target.value);
  };

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e) => {
    const isPassedValidation = fetchData?.data.includes(e.target.value);
    if (!(e.relatedTarget && e.relatedTarget.type === "button")) {
      if (isPassedValidation) {
        setCheckValidation(true);
      } else {
        setCheckValidation(false);
      }
    }
    if (e.relatedTarget?.type == "button") {
      setCheckValidation(true);
    }
  };

  const handlePickData = ((event: React.MouseEvent<HTMLButtonElement>) => {
    onChange(event);
    setInputValue((event.target as HTMLElement).textContent as string);
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
        onBlur={handleBlur}
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
        <div className={styles.container} ref={dropdownContainerRef}>
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
          {toggle
          && !inputValue
          && fetchData
          && fetchData.data.map((list:string) => {
            return (
              <button
                type="button"
                onClick={handlePickData}
                className={styles.content}
                key={list}
                name={type === "address" ? "address" : "category"}
              >
                {list}
              </button>
            );
          })}
        </div>
      </div>
      {!checkValidaiton && <p>유효성 검사 실패</p>}
    </div>
  );
};

export default Dropdown;
