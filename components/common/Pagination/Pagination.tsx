import Image from "next/image";
import styles from "./Paigination.moudle.scss";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageClick: (page: number) => void;
}

const Pagination = ({
  currentPage,
  lastPage,
  onPageClick,
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

  const renderButtons = (): JSX.Element[] => {
    const buttons: JSX.Element[] = [];

    if (lastPage <= 7) {
      for (let page = 1; page <= lastPage; page += 1) {
        buttons.push(
          <button
            key={page}
            type="button"
            className={currentPage === page ? styles.currentPage : ""}
            onClick={() => { return handleClick(page); }}
            disabled={currentPage === page}
          >
            {page}
          </button>,
        );
      }

      return buttons;
    }

    buttons.push(
      <button
        type="button"
        onClick={() => { return handleClick(Math.max(currentPage - 7, 1)); }}
        disabled={currentPage < 5}
      >
        <Image
          width={20}
          height={20}
          src="/images/chevron.svg"
          alt="Previous Page"
        />
      </button>,
    );

    const prevButtons = range(
      Math.max(1, currentPage - 3),
      Math.min(currentPage - 1, lastPage),
    );

    prevButtons.forEach((page) => {
      buttons.push(
        <button
          key={page}
          type="button"
          onClick={() => { return handleClick(page); }}
        >
          {page}
        </button>,
      );
    });

    return buttons;
  };

  return (
    <div className={styles.container}>
      {renderButtons()}
    </div>
  );
};

export default Pagination;
