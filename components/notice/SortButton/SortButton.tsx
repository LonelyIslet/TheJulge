"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { SORT_OPTIONS } from "constants/notice";
import useOutsideClick from "hooks/useOutsideClick";
import SortDropdown from "./SortDropdown/SortDropdown";
import styles from "./SortButton.module.scss";

const SortButton = () => {
  const [sortOptionId, setSortOptionId] = useState(0);
  const [showPopover, setShowPopover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => { return setShowPopover(false); });

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  const handleOptionSelect = (id: number) => {
    setSortOptionId(id);
    setShowPopover((prev) => { return !prev; });
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
      <button
        type="button"
        className={styles.button}
        onClick={handlePopoverToggle}
      >
        <h2>
          {SORT_OPTIONS[sortOptionId]?.label}
        </h2>
        <Image
          width={10}
          height={10}
          src="/images/dropdown.svg"
          alt="Dropdown"
        />
      </button>
      {showPopover && (<SortDropdown onOptionClick={handleOptionSelect} />)}
    </div>
  );
};

export default SortButton;
