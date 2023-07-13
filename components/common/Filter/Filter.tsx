"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Filter.module.scss";

interface FilterProps {
  onClose?: () => void;
}

const Filter = ({
  onClose = () => {},
}: FilterProps) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [fromWage, setFromWage] = useState("");

  const addCommas = (value: string) => {
    const parts = value.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return parts.join(".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue.replace(/\D/g, "");
    const formattedValue = addCommas(numericValue);

    setFromWage(formattedValue);
  };

  const onReset = () => {
    setFromWage("");
    setFromDate(new Date());
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>
          상세 필터
        </h3>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >
          <Image
            fill
            src="/images/close.svg"
            alt="Close"
          />
        </button>
      </div>
      <div className={styles.contents}>
        <p>위치</p>
        <div className={styles.location}>
          서울시 강남구
        </div>
        <div className={styles.selectedLocation}>
          <button
            type="button"
            className={styles.locationButton}
          >
            경기도 안산시
            <div className={styles.redCloseButton}>
              <Image
                fill
                src="/images/close-red.svg"
                alt="Close Red"
              />
            </div>
          </button>
          <button
            type="button"
            className={styles.locationButton}
          >
            경기도 부천시
            <div className={styles.redCloseButton}>
              <Image
                fill
                src="/images/close-red.svg"
                alt="Close Red"
              />
            </div>
          </button>
          <button
            type="button"
            className={styles.locationButton}
          >
            전라도 신안군
            <div className={styles.redCloseButton}>
              <Image
                fill
                src="/images/close-red.svg"
                alt="Close Red"
              />
            </div>
          </button>
          <button
            type="button"
            className={styles.locationButton}
          >
            전라도 광주시
            <div className={styles.redCloseButton}>
              <Image
                fill
                src="/images/close-red.svg"
                alt="Close Red"
              />
            </div>
          </button>
        </div>
        <hr />
        <div className={styles.labelInputContainer}>
          <label htmlFor="fromDate">시작일</label>
          <div className={styles.inputWrapper}>
            <input
              type="date"
              id="fromDate"
              name="fromDate"
              autoComplete="off"
              value={
              `${fromDate.getFullYear().toString()
              }-${
                (fromDate.getMonth() + 1).toString().padStart(2, "0")
              }-${
                fromDate.getDate().toString().padStart(2, "0")}`
            }
              onChange={(e) => {
                setFromDate(new Date(e.target.value));
              }}
            />
          </div>
        </div>
        <hr />
        <div className={styles.labelInputContainer}>
          <label htmlFor="fromWage">금액</label>
          <div className={`${styles.inputWrapper} ${styles.wageInput}`}>
            <input
              type="text"
              id="fromWage"
              name="fromWage"
              placeholder="입력"
              pattern="[0-9]*"
              value={fromWage}
              onChange={handleChange}
              inputMode="numeric"
            />
            <span className={styles.won}>원</span>
          </div>
          <span>이상부터</span>
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={onReset}
          >
            초기화
          </button>
          <button
            type="button"
            className={styles.applyButton}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
