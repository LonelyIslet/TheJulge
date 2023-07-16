"use client";

import Image from "next/image";
import classNames from "classnames/bind";
import { ApplyStatus } from "types/enums/apply.enum";
import { IAlert } from "types/dto";
import formatTimeRange from "utils/formatTimeRange";
import showElapsedTime from "utils/showElapsedTime";
import styles from "./NotificationBoard.module.scss";

const cx = classNames.bind(styles);

const labelMap = {
  [ApplyStatus.ACCEPTED]: "승인",
  [ApplyStatus.REJECTED]: "거절",
};

interface NotificationBoardProps {
  alertList: IAlert[];
  onClose: () => void;
}

const NotificationBoard = ({
  alertList,
  onClose,
}: NotificationBoardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          알림
          {" "}
          {alertList.length}
          개
        </h2>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <Image src="/images/close.svg" fill alt="닫기 버튼" />
        </button>
      </div>
      <ul className={styles.itemList}>
        {alertList.map((item) => {
          const {
            shop: { item: shop }, notice: { item: notice }, createdAt, result,
          } = item;
          return (
            <li key={item.id} className={styles.item}>
              <div className={cx("ellipsis", `${result}`)} />
              <p className={styles.content}>
                {shop.name}
                {`(${formatTimeRange(notice.startsAt, notice.workhour, false)})`}
                {" "}
                공고 지원이
                {" "}
                <span className={cx(`${result}`)}>{labelMap[result]}</span>
                되었어요.
              </p>
              <p className={styles.time}>{showElapsedTime(createdAt)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationBoard;
