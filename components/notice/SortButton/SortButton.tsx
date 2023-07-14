"use client";

import Image from "next/image";
import styles from "./SortButton.module.scss";

const SortButton = () => {
  const handleClick = () => {
    // dropdown 열기
    return null;
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
    >
      <h2>
        마감임박순
      </h2>
      <Image
        width={10}
        height={10}
        src="/images/dropdown.svg"
        alt="Dropdown"
      />
    </button>
  );
};

export default SortButton;
