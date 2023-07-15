"use client";

import { useState, useEffect, useRef } from "react";
import { Filter } from "components/common";
import styles from "./FilterButton.module.scss";

const FilterButton = () => {
  const [showPopover, setShowPopover] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleShowPopup = () => {
    setShowPopover((prev) => { return !prev; });
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={styles.container}
      ref={containerRef}
    >
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
