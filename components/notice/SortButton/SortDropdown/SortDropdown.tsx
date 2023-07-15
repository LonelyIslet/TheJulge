"use client";

import { SORT_OPTIONS } from "constants/notice";
import styles from "./SortDropdown.module.scss";

interface SortDropdownProps {
  onOptionClick: (id: number) => void;
}

const SortDropdown = ({
  onOptionClick,
}: SortDropdownProps) => {
  const renderButtons = SORT_OPTIONS.map((option) => {
    return (
      <button
        key={option.id}
        type="button"
        className={styles.option}
        onClick={() => { return onOptionClick(option.id); }}
      >
        {option.label}
      </button>
    );
  });

  return (
    <div className={styles.container}>
      {renderButtons}
    </div>
  );
};
export default SortDropdown;
