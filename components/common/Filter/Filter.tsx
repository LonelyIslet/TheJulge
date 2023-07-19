"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ADDRESS } from "constants/dropdown/dropdownData";
import { FilterOptions } from "types/notice/filter";
import addCommasToString from "utils/notice/addCommasToString";
import dateToStr from "utils/dateToStr";
import parseFilterToObject from "utils/notice/parseFilterToObject";
import styles from "./Filter.module.scss";

interface FilterProps {
  filter?: string;
  keyword: string;
  onClose: () => void;
}

const Filter = ({
  filter,
  keyword,
  onClose,
}: FilterProps) => {
  let options: FilterOptions;
  if (filter) {
    options = parseFilterToObject(filter);
  } else {
    options = {
      address: new Set<number>(),
      startsAtGte: null,
      hourlyPayGte: 0,
    };
  }

  const [address, setAddress] = useState(options.address);
  const [startsAtGte, setStartsAtGte] = useState(options.startsAtGte);
  const [sagPresent, setSagPresent] = useState(() => {
    if (options.startsAtGte) {
      return dateToStr(options.startsAtGte);
    }
    return "";
  });
  const [hourlyPayGte, setHourlyPayGte] = useState(options.hourlyPayGte);
  const [hpgPresent, setHpgPresent] = useState(
    () => { return addCommasToString(String(options.hourlyPayGte)); },
  );
  const [inputType, setInputType] = useState("text");
  const router = useRouter();

  const handleAddressClick = (id: number) => {
    address.add(id);
    setAddress(new Set(address));
  };

  const handleDeleteLocation = (id: number) => {
    address.delete(id);
    setAddress(new Set(address));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue.replace(/\D/g, "");
    const formattedValue = addCommasToString(numericValue);

    setHourlyPayGte(Number(numericValue));
    setHpgPresent(formattedValue);
  };

  const onReset = () => {
    setAddress(new Set<number>());
    setHourlyPayGte(0);
    setHpgPresent("");
    setStartsAtGte(null);
    setSagPresent("");
  };

  const handleApply = () => {
    let query = "";

    if (keyword) {
      query += `?keyword=${keyword}`;
    }

    if (address.size || hourlyPayGte || startsAtGte) {
      query += "?filter=";
    }

    if (address.size) {
      query += "address$";
      address.forEach((item) => {
        query += `${item}$`;
      });
    }

    if (hourlyPayGte) {
      query += `hourlyPayGte$${hourlyPayGte}$`;
    }

    if (startsAtGte) {
      const sagStr = startsAtGte.toISOString();
      query += `startsAtGte$${sagStr}`;
    }

    query = query.replace(/\$$/, "");

    onClose();
    router.push(`/posts/${query}`);
  };

  const RenderAddressSet = Array.from(address).map((id) => {
    return (
      <button
        key={id}
        type="button"
        className={styles.locationButton}
        onClick={() => { return handleDeleteLocation(id); }}
      >
        {ADDRESS[id]}
        <div className={styles.redCloseButton}>
          <Image
            fill
            src="/images/close-red.svg"
            alt="Close Red"
          />
        </div>
      </button>
    );
  });

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
          {ADDRESS.map((item, idx) => {
            return (
              <button
                key={item}
                type="button"
                onClick={() => { return handleAddressClick(idx); }}
              >
                {item}
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
              type={inputType}
              id="fromDate"
              name="fromDate"
              autoComplete="off"
              value={sagPresent}
              placeholder="입력"
              onFocus={() => {
                setInputType("date");
              }}
              onBlur={() => {
                setInputType("text");
              }}
              onChange={(e) => {
                setSagPresent(e.target.value);
                setStartsAtGte(e.target.value ? new Date(e.target.value) : null);
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
              value={hpgPresent === "0" ? "" : hpgPresent}
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
            onClick={handleApply}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
