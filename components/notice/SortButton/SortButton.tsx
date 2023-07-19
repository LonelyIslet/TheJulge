"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Popover } from "components/common";
import { SORT_OPTIONS } from "constants/notice";
import parseQuery from "utils/notice/parseQuery";
import SortDropdown from "./SortDropdown/SortDropdown";
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
    const queryString = parseQuery({ keyword, sort, filter });
    router.push(queryString);
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
