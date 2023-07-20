"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ADDRESS } from "constants/dropdown/dropdownData";
import { Address1 } from "types/shop/address";
import { Sort } from "types/notice/queries";
import dateToStr from "utils/dateToStr";
import addCommasToString from "utils/notice/addCommasToString";
import generateNoticesPageQuery from "utils/notice/generateNoticesPageQuery";
import styles from "./Filter.module.scss";

interface FilterProps {
  limit: number;
  keyword?: string;
  sort?: Sort;
  address?: Address1[];
  startsAtGte?: string;
  hourlyPayGte?: number;
  onClose: () => void;
}

const Filter = ({
  limit,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
  onClose,
}: FilterProps) => {
  const initialAddress = address?.length ? new Set<Address1>(address) : new Set<Address1>();
  const [addressSet, setAddressSet] = useState(initialAddress);
  const initialStartsAtGte = startsAtGte ? new Date(startsAtGte) : undefined;
  const [startsAtGteDate, setStartsAtGteDate] = useState(initialStartsAtGte);
  const initialSagPresent = initialStartsAtGte ? dateToStr(initialStartsAtGte) : "";
  const [sagPresent, setSagPresent] = useState(initialSagPresent);
  const [hourlyPayGteState, setHourlyPayGteState] = useState(hourlyPayGte);
  const initialHpgPresent = addCommasToString(String(hourlyPayGte));
  const [hpgPresent, setHpgPresent] = useState(initialHpgPresent);
  const [inputType, setInputType] = useState("text");
  const router = useRouter();

  const handleAddressClick = (option: Address1) => {
    addressSet.add(option);
    setAddressSet(new Set(addressSet));
  };

  const handleDeleteLocation = (option: Address1) => {
    addressSet.delete(option);
    setAddressSet(new Set(address));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue.replace(/\D/g, "");
    const formattedValue = addCommasToString(numericValue);

    setHourlyPayGteState(Number(numericValue));
    setHpgPresent(formattedValue);
  };

  const onReset = () => {
    setAddressSet(new Set<Address1>());
    setHourlyPayGteState(0);
    setHpgPresent("");
    setStartsAtGteDate(undefined);
    setSagPresent("");
  };

  const handleApply = () => {
    const queryString = generateNoticesPageQuery({
      page: 1,
      limit,
      keyword,
      sort,
      address: Array.from(addressSet),
      startsAtGte: startsAtGteDate?.toISOString(),
      hourlyPayGte: hourlyPayGteState,
    });

    onClose();

    if (keyword) {
      router.push(`/notices${queryString}`);
    } else {
      router.push(queryString);
    }
  };

  const RenderAddressSet = Array.from(addressSet).map((option) => {
    return (
      <button
        key={option}
        type="button"
        className={styles.locationButton}
        onClick={() => { return handleDeleteLocation(option); }}
      >
        {option}
        <div className={styles.redCloseButton}>
          <Image
            fill
            src="/images/close-red.svg"
            alt="Red Close Button"
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
            alt="Close Button"
          />
        </button>
      </div>
      <div className={styles.contents}>
        <p>위치</p>
        <div className={styles.location}>
          {ADDRESS.map((item) => {
            return (
              <button
                key={item}
                type="button"
                onClick={() => { return handleAddressClick(item as Address1); }}
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
              min={dateToStr(new Date())}
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
                setStartsAtGteDate(e.target.value ? new Date(e.target.value) : undefined);
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
