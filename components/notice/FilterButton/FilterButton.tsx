"use client";

import { useState } from "react";
import { Filter, Popover } from "components/common";
import { FilterOptions } from "types/notice/filter";
import calcOptions from "utils/notice/calcOptions";
import parseFilterToObject from "utils/notice/parseFilterToObject";
import styles from "./FilterButton.module.scss";

interface FilterButtonProps {
  filter?: string;
  keyword: string;
}

const FilterButton = ({
  filter,
  keyword,
}: FilterButtonProps) => {
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  let filterOptions: FilterOptions | undefined;
  if (filter) {
    filterOptions = parseFilterToObject(filter);
  }

  let optionsNum = 0;
  if (filterOptions) {
    optionsNum = calcOptions(filterOptions);
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
              filter={filter}
              keyword={keyword}
              onClose={handlePopoverToggle}
            />
          </Popover>
        )}
    </div>
  );
};

export default FilterButton;
