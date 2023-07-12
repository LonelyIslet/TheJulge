import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./NotificationPopover.module.scss";

const cx = classNames.bind(styles);

const NotificationPopover = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>알림 6개</h2>
        <div className={styles.closeBtn}>
          <Image src="/images/close.svg" fill alt="닫기 버튼" />
        </div>
      </div>
      <ul className={styles.itemList}>
        <li className={styles.item}>
          <div className={cx("ellipsis", "accepted")} />
          <p className={styles.content}>
            HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이
            {" "}
            <span className={styles.accepted}>승인</span>
            되었어요.
          </p>
          <p className={styles.time}>1분 전</p>
        </li>
        <li className={styles.item}>
          <div className={cx("ellipsis", "rejected")} />
          <p className={styles.content}>
            HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이
            {" "}
            <span className={styles.rejected}>거절</span>
            되었어요.
          </p>
          <p className={styles.time}>1분 전</p>
        </li>
        <li className={styles.item}>
          <div className={cx("ellipsis", "accepted")} />
          <p className={styles.content}>
            HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이
            {" "}
            <span className={styles.accepted}>승인</span>
            되었어요.
          </p>
          <p className={styles.time}>1분 전</p>
        </li>
        <li className={styles.item}>
          <div className={cx("ellipsis", "accepted")} />
          <p className={styles.content}>
            HS 과일주스(2023-01-14 15:00~18:00) 공고 지원이
            {" "}
            <span className={styles.accepted}>승인</span>
            되었어요.
          </p>
          <p className={styles.time}>1분 전</p>
        </li>
      </ul>
    </div>
  );
};

export default NotificationPopover;
