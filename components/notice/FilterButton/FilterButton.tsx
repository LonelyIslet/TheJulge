"use client";

import { useState } from "react";
import { Filter, Popover } from "components/common";
import styles from "./FilterButton.module.scss";

const FilterButton = () => {
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  return (
    <div
      className={styles.container}
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
          <Popover
            top="3.8rem"
            onClose={handlePopoverToggle}
          >
            <Filter />
          </Popover>
        )}
    </div>
  );
};

export default FilterButton;
