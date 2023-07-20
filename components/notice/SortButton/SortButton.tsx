"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Popover } from "components/common";
import SortDropdown from "components/notice/SortButton/SortDropdown/SortDropdown";
import { Sort } from "types/notice/queries";
import { Address1 } from "types/shop/address";
import generateNotciesPageQuery from "utils/notice/generateNotciesPageQuery";
import styles from "./SortButton.module.scss";

interface SortButtonProps {
  limit: number;
  keyword?: string;
  sort?: Sort;
  address?: Address1[];
  startsAtGte?: string;
  hourlyPayGte?: number;
}

const SortButton = ({
  limit,
  keyword,
  sort,
  address,
  startsAtGte,
  hourlyPayGte,
}: SortButtonProps) => {
  const [sortOption, setSortOption] = useState(sort || undefined);
  const [showPopover, setShowPopover] = useState(false);
  const router = useRouter();

  const handlePopoverToggle = () => {
    setShowPopover((prev) => { return !prev; });
  };

  const handleSortOptionClick = (option?: Sort) => {
    setSortOption(option);
    setShowPopover((prev) => { return !prev; });
    const queryString = generateNotciesPageQuery({
      limit,
      keyword,
      sort: sortOption,
      address,
      startsAtGte,
      hourlyPayGte,
    });

    if (keyword) {
      router.push(`/notices${queryString}`);
    } else {
      router.push(queryString);
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
          {sortOption || "최신등록순"}
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
