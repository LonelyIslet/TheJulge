"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SortButton.module.scss";

const SortButton = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onToggle = () => {
    setIsClicked((prev) => { return !prev; });
  };

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onToggle}
    >
      <h2>
        마감임박순
      </h2>
      <Image
        width={10}
        height={10}
        src={isClicked ? "/images/triangle.svg" : "/images/dropdown.svg"}
        alt="Dropdown"
      />
    </button>
  );
};

export default SortButton;
