"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Popover } from "components/common";
import SortDropdown from "components/notice/SortButton/SortDropdown/SortDropdown";
import { SORT_OPTIONS } from "constants/notice";
import makeQuery from "utils/notice/makeQuery";
import parseFilterToObject from "utils/notice/parseFilterToObject";
import styles from "./SortButton.module.scss";

interface SortButtonProps {
  filter: string,
  sortOptionId: number,
}

const SortButton = ({
  filter,
  sortOptionId,
}: SortButtonProps) => {
  const [optionId, setOptionId] = useState(sortOptionId);
  const [showPopover, setShowPopover] = useState(false);
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const router = useRouter();

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  const handleOptionSelect = (id: number) => {
    setOptionId(id);
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
          {SORT_OPTIONS[optionId].label}
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
            <SortDropdown onClick={handleOptionSelect} />
          </Popover>
        )}
    </div>
  );
};

export default SortButton;
