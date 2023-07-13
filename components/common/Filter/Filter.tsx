"use client";

import Image from "next/image";
import styles from "./Filter.module.scss";

interface FilterProps {
  onClose: () => void;
}

const Filter = ({
  onClose,
}: FilterProps) => {
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
        <div>
          <label
            htmlFor="dateInput"
            className={styles.startDate}
          >
            시작일
          </label>
          <input
            className={styles.dateInput}
            type="date"
            placeholder="입력"
            id="dateInput"
          />
        </div>
        <hr />
        <div>
          <label
            htmlFor="hourlyWage"
            className={styles.hourlyWage}
          >
            금액
          </label>
          <input
            className={styles.wageInput}
            type="number"
            placeholder="입력"
            id="dateInput"
          />
          원 이상부터
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.resetButton}
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
