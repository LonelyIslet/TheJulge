"use client";

import { useState } from "react";
import { Filter } from "components/common";
import styles from "./FilterButton.module.scss";

const FilterButton = () => {
  const [showPopover, setShowPopover] = useState(false);

  const toggleShowPopup = () => {
    setShowPopover((prev) => { return !prev; });
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        onClick={toggleShowPopup}
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
              onClose={toggleShowPopup}
            />
          </div>
        )}
    </div>
  );
};

export default FilterButton;
