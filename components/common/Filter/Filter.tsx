/* eslint-disable jsx-a11y/label-has-associated-control */
import Image from "next/image";
import styles from "./Filter.module.scss";

const Filter = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstLine}>
        <div>
          상세 필터
        </div>
        <div>
          <Image
            width={13}
            height={13}
            src="/images/close.svg"
            alt="Close"
          />
        </div>
      </div>
      <p>위치</p>
      <div className={styles.location}>
        서울시 강남구
      </div>
      <div className={styles.selectedLocation}>
        서울시 광진구
      </div>
      <br />
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
      <label
        htmlFor="hourlyWage"
        className={styles.hourlyWage}
      >
        시작일
      </label>
      <input
        className={styles.wageInput}
        type="number"
        placeholder="입력"
        id="dateInput"
      />
      원 이상부터
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
  );
};

export default Filter;
