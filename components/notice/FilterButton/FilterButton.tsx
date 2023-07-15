"use client";

import { useState, useRef } from "react";
import { Filter } from "components/common";
import useOutsideClick from "hooks/useOutsideClick";
import styles from "./FilterButton.module.scss";

const FilterButton = () => {
  const [showPopover, setShowPopover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(containerRef, () => { return setShowPopover(false); });

  const handlePopoverToggle = () => {
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
          상세 필터
          {/* Redux로 필터 갯수 상태관리 */}
        </h2>
      </button>
      {showPopover
        && (
          <div className={styles.filterWrapper}>
            <Filter
              onClose={handlePopoverToggle}
            />
          </div>
        )}
    </div>
  );
};

export default FilterButton;
