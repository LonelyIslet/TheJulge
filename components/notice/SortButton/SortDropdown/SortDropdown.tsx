"use client";

import { SORT_OPTIONS } from "constants/notice";
import styles from "./SortDropdown.module.scss";

interface SortDropdownProps {
  onClick: (id: number) => void;
}

const SortDropdown = ({
  onClick,
}: SortDropdownProps) => {
  return (
    <div className={styles.container}>
      {SORT_OPTIONS.map((item) => {
        return (
          <button
            key={item.id}
            type="button"
            className={styles.option}
            onClick={() => { return onClick(item.id); }}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default SortDropdown;
