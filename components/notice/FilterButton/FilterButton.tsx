"use client";

import { useState } from "react";
import { Filter, Popover } from "components/common";
import { Sort } from "types/notice/queries";
import { Address1 } from "types/shop/address";
import styles from "./FilterButton.module.scss";

interface FilterButtonProps {
  limit: number;
  keyword?: string;
  sort?: Sort;
  address?: Address1[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

const FilterButton = ({
  limit,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: FilterButtonProps) => {
  const [showPopover, setShowPopover] = useState(false);

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  let optionsNum = 0;

  if (address?.length) {
    optionsNum += address.length;
  }

  if (startsAtGte) {
    optionsNum += 1;
  }

  if (hourlyPayGte) {
    optionsNum += 1;
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
              limit={limit}
              keyword={keyword}
              sort={sort}
              address={address}
              startsAtGte={startsAtGte}
              hourlyPayGte={hourlyPayGte}
              onClose={handlePopoverToggle}
            />
          </Popover>
        )}
    </div>
  );
};

export default FilterButton;
