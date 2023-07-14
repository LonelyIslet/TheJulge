"use client";

import { useState } from "react";
import Image from "next/image";
import { ADDRESS_1 } from "constants/notice/address";
import addCommasToString from "utils/addCommasToString";
import styles from "./Filter.module.scss";

interface FilterProps {
  onClose?: () => void;
}

const Filter = ({
  onClose = () => {},
}: FilterProps) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [fromPay, setFromPay] = useState("");
  const [addressSet, setAddressSet] = useState(new Set<number>());

  const handleAddressClick = (id: number) => {
    addressSet.add(id);
    setAddressSet(new Set(addressSet));
  };

  const handleDeleteLocation = (id: number) => {
    addressSet.delete(id);
    setAddressSet(new Set(addressSet));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue.replace(/\D/g, "");
    const formattedValue = addCommasToString(numericValue);

    setFromPay(formattedValue);
  };

  const onReset = () => {
    setFromPay("");
    setFromDate(new Date());
  };

  const onApply = () => {

  };

  const RenderAddressSet = Array.from(addressSet).map(((id) => {
    return (
      <button
        key={id}
        type="button"
        className={styles.locationButton}
        onClick={() => { return handleDeleteLocation(id); }}
      >
        {ADDRESS_1[id]?.label}
        <div className={styles.redCloseButton}>
          <Image
            fill
            src="/images/close-red.svg"
            alt="Close Red"
          />
        </div>
      </button>
    );
  }));

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
          {ADDRESS_1.map((address) => {
            return (
              <button
                key={address.id}
                type="button"
                onClick={() => { return handleAddressClick(address.id); }}
              >
                {address.label}
              </button>
            );
          })}
        </div>
        <div className={styles.selectedLocation}>
          {RenderAddressSet}
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
          <label htmlFor="fromPay">금액</label>
          <div className={`${styles.inputWrapper} ${styles.payInput}`}>
            <input
              type="text"
              id="fromPay"
              name="fromPay"
              placeholder="입력"
              pattern="[0-9]*"
              value={fromPay}
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
            onClick={onApply}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
