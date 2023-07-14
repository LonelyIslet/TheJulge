"use client";

import Image from "next/image";
import styles from "./Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageClick?: (page: number) => void;
}

const Pagination = ({
  currentPage,
  lastPage,
  onPageClick = () => {},
}: PaginationProps) => {
  const handleClick = (page: number) => {
    onPageClick(page);
  };

  const range = (start: number, end: number) => {
    return Array.from(
      { length: end - start + 1 },
      (_, i) => { return start + i; },
    );
  };

  const renderButtons = () => {
    const buttons: JSX.Element[] = [];

    if (lastPage <= 7) {
      for (let page = 1; page <= lastPage; page += 1) {
        buttons.push(
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${currentPage === page ? styles.currentPageButton : ""}`}
            onClick={() => { return handleClick(page); }}
            disabled={currentPage === page}
          >
            {page}
          </button>,
        );
      }

      return buttons;
    }

    let start = 1;
    let end = 7;

    if (currentPage > 4) {
      start = currentPage - 3;
      end = currentPage + 3;
    }

    if (currentPage + 3 > lastPage) {
      start = lastPage - 6;
      end = lastPage;
    }

    const buttonRange = range(start, end);

    if (start > 1) {
      buttons.push(
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => { return handleClick(1); }}
        >
          <Image
            width={20}
            height={20}
            src="/images/chevron.svg"
            alt="First Page"
          />
        </button>,
      );
    }

    buttonRange.forEach((page) => {
      buttons.push(
        <button
          key={page}
          type="button"
          className={`${styles.pageButton} ${currentPage === page ? styles.currentPageButton : ""}`}
          onClick={() => { return handleClick(page); }}
        >
          {page}
        </button>,
      );
    });

    if (end < lastPage) {
      buttons.push(
        <button
          type="button"
          className={styles.pageButton}
          onClick={() => { return handleClick(lastPage); }}
        >
          <Image
            width={20}
            height={20}
            className={styles.reversed}
            src="/images/chevron.svg"
            alt="Last Page"
          />
        </button>,
      );
    }

    return buttons;
  };

  return (
    <div className={styles.container}>
      {renderButtons()}
    </div>
  );
};

export default Pagination;
