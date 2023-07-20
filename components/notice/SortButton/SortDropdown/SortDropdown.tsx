"use client";

import { Sort } from "types/notice/queries";
import { SORT_OPTIONS } from "constants/notice";
import styles from "./SortDropdown.module.scss";

interface SortDropdownProps {
  onSortOptionClick: (option?: Sort) => void;
}

const SortDropdown = ({
  onSortOptionClick,
}: SortDropdownProps) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.option}
        onClick={() => { return onSortOptionClick(); }}
      >
        최신등록순
      </button>
      {Object.entries(SORT_OPTIONS).map(([key, value]) => {
        return (
          <button
            key={key}
            type="button"
            className={styles.option}
            onClick={() => { return onSortOptionClick(key as Sort); }}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default SortDropdown;
