"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import useDropdown from "hooks/useDropdown";
import styles from "./Dropdown.module.scss";

interface ICountValidation {
  [key: string]: number;
}

interface IData {
  [key: string]: string | number;
}
interface DropdownProps {
  type: "address" | "category"
  label: string
  id: string
  name: string
  required?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  rendering: boolean
  countValidation: ICountValidation
  data: IData
}

const Dropdown = ({
  type,
  label,
  id,
  onChange,
  data,
  name,
  required,
  rendering,
  countValidation,
}: DropdownProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [swingValidationText, setSwingValidationText] = useState(false);
  const { toggle, setToggle, fetchData } = useDropdown(divRef, type);
  const [clickCount, setClickCount] = useState(0);

  const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setClickCount(1);
    onChange(event);
  };

  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    if (setToggle) {
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    setSwingValidationText((prevSwingValidationText) => { return !prevSwingValidationText; });
  }, [rendering]);

  return (
    <div className={styles.box} ref={divRef} onClick={handleToggle} role="presentation">
      <label className={styles.label} htmlFor={id}>{required ? `${label}*` : label}</label>
      <div
        id={id}
        className={styles.userInput}
      >
        {data[name]}
      </div>
      <Image
        className={styles.toggle}
        src={toggle ? "/images/Triangle.svg" : "/images/dropdown.svg"}
        alt="창내림"
        width={16}
        height={16}
        onClick={handleToggle}
        id="toggle"
      />
      <div
        className={toggle
          ? styles.container
          : styles.containerHide}
        ref={dropdownContainerRef}
      >
        {toggle
          && fetchData
          && fetchData.data.map(((list: string) => {
            return (
              <div className={styles.select} key={list}>
                <input
                  id={list}
                  name={name}
                  type="radio"
                  value={list}
                  className={styles.content}
                  onChange={handleInputValue}
                />
                <label htmlFor={list}>
                  {list}
                </label>
              </div>
            );
          }))}
      </div>
      {!!countValidation?.[name]
        && !toggle
        && !clickCount
        && !data[name]
        && (
        <p className={swingValidationText
          ? `${styles.validation}` : `${styles.swing}`}
        >
          필수 항목입니다.
        </p>
        )}
    </div>
  );
};

export default Dropdown;
