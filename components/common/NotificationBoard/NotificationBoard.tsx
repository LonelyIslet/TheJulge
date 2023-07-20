/* eslint-disable no-void */
import Image from "next/image";
import classNames from "classnames/bind";
import { ApplyStatus } from "types/enums/apply.enum";
import { IAlert } from "types/dto";
import formatTimeRange from "utils/common/formatTimeRange";
import showElapsedTime from "utils/common/showElapsedTime";
import useReadAlert from "hooks/api/alert/useReadAlert";
import useAppSelector from "redux/hooks/useAppSelector";
import styles from "./NotificationBoard.module.scss";

const cx = classNames.bind(styles);

const labelMap = {
  [ApplyStatus.ACCEPTED]: "승인",
  [ApplyStatus.REJECTED]: "거절",
};

interface NotificationBoardProps {
  alertList: IAlert[];
  isLoading: boolean;
  onRead: (alertId: string) => void;
  onClose: () => void;
}

const NotificationBoard = ({
  alertList,
  isLoading,
  onRead,
  onClose,
}: NotificationBoardProps) => {
  const { readAlert } = useReadAlert();
  const userId = useAppSelector((state) => { return state.user.userInfo?.id; });

  const handleRead = (alertId?: string) => {
    if (!alertId) {
      return;
    }
    void readAlert(userId as string, alertId);
    onRead(alertId);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>
          {isLoading ? "알림을 불러오는 중입니다..." : `알림 ${alertList.length}개`}
        </h2>
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          <Image src="/images/close.svg" alt="닫기 버튼" fill />
        </button>
      </div>
      <ul className={styles.itemList}>
        {isLoading ? (
          <>
            <li className={styles.skeletonItem}>
              <div className={styles.ellipsis} />
              <div className={styles.content} />
              <div className={styles.time} />
            </li>
            <li className={styles.skeletonItem}>
              <div className={styles.ellipsis} />
              <div className={styles.content} />
              <div className={styles.time} />
            </li>
            <li className={styles.skeletonItem}>
              <div className={styles.ellipsis} />
              <div className={styles.content} />
              <div className={styles.time} />
            </li>
          </>
        ) : alertList.map((item) => {
          const {
            shop: { item: shop }, notice: { item: notice }, createdAt, result,
          } = item;

          return (
            <li key={item.id} className={styles.item}>
              <div className={cx("ellipsis", `${result}`)} />
              <p className={styles.content}>
                {shop.name}
                {`(${formatTimeRange(notice.startsAt, notice.workhour, false)}) 공고 지원이 `}
                <span className={cx(`${result}`)}>{labelMap[result]}</span>
                되었어요.
              </p>
              <p className={styles.time}>{showElapsedTime(createdAt)}</p>
              <button className={styles.readBtn} onClick={() => { handleRead(item.id as string); }}>
                <p>읽음</p>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationBoard;
