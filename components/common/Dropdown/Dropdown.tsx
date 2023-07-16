"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import useDropdown from "hooks/useDropdown";
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
  const [swingValidationText, setSwingValidationText] = useState(false);
  const { toggle, setToggle, fetchData } = useDropdown(divRef, type);

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    setInputValue(event.target.value);
  };

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const isPassedValidation = fetchData?.data.includes(e.target.value);
    // 드롭 다운에 있는 버튼이 아닐 경우에만 유효성 검사 진행
    if ((e.relatedTarget as HTMLButtonElement)?.type !== "button") {
      if (isPassedValidation) {
        setCheckValidation(true);
      } else {
        setCheckValidation(false);
      }
    }
    if ((e.relatedTarget as HTMLButtonElement)?.type === "button") {
      setCheckValidation(true);
    }
    if (!isPassedValidation) {
      setSwingValidationText(!swingValidationText);
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
      <div
        className={toggle ? styles.container
          : styles.containerHide}
        ref={dropdownContainerRef}
      >
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
      {!toggle && !checkValidaiton && <p className={swingValidationText ? `${styles.validation}` : `${styles.swing}`}>알맞은 값을 입력하세요.</p>}
    </div>
  );
};

export default Dropdown;
