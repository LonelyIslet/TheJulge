"use client";

import { useState } from "react";
import { Filter, Popover } from "components/common";
import { FilterOptions } from "types/notice/filter";
import calcOptions from "utils/notice/calcOptions";
import styles from "./FilterButton.module.scss";

interface FilterButtonProps {
  options?: FilterOptions;
  keyword: string;
}

const FilterButton = ({
  options,
  keyword,
}: FilterButtonProps) => {
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  let optionsNum = 0;
  if (options) {
    optionsNum = calcOptions(options);
  }

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
          {optionsNum ? ` (${optionsNum})` : ""}
        </h2>
      </button>
      {showPopover
        && (
          <Popover
            top="3.8rem"
            onClose={handlePopoverToggle}
          >
            <Filter
              options={options}
              keyword={keyword}
              onClose={handlePopoverToggle}
            />
          </Popover>
        )}
    </div>
  );
};

export default FilterButton;
