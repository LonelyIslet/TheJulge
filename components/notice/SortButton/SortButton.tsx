"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Popover } from "components/common";
import SortDropdown from "components/notice/SortButton/SortDropdown/SortDropdown";
import { SORT_OPTIONS } from "constants/notice";
import makeQuery from "utils/notice/makeQuery";
import parseFilterToObject from "utils/notice/parseFilterToObject";
import styles from "./SortButton.module.scss";

interface SortButtonProps {
  offset?: number;
  limit?: number;
  keyword?: string;
  sortId?: number;
  address?: string[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

const SortButton = ({
  offset,
  limit,
  keyword,
  sortId,
  address,
  startsAtGte,
  hourlyPayGte,
}: SortButtonProps) => {
  const [sortOptionId, setSortOptionId] = useState(sortId);
  const [showPopover, setShowPopover] = useState(false);
  const router = useRouter();

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  const handleSortOptionClick = (id: number) => {
    setSortOptionId(id);
    setShowPopover((prev) => { return !prev; });
    const sort = SORT_OPTIONS[id].option;
    const filterOptions = parseFilterToObject(filter);
    const query = makeQuery({ keyword, sort, filterOptions });
    if (keyword) {
      router.push(`/notices${query}`);
    } else {
      router.push(query);
    }
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
          {sortOptionId ? SORT_OPTIONS[sortOptionId].label : SORT_OPTIONS[0].label }
        </h2>
        <Image
          width={10}
          height={10}
          src="/images/dropdown.svg"
          alt="Dropdown"
        />
      </button>
      {showPopover
        && (
          <Popover
            top="3.8rem"
            onClose={handlePopoverToggle}
          >
            <SortDropdown onSortOptionClick={handleSortOptionClick} />
          </Popover>
        )}
    </div>
  );
};

export default SortButton;
