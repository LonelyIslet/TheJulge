import Image from "next/image";
import classNames from "classnames/bind";
import calculatePercentage from "utils/calculatePercentage";
import formatTimeRange from "utils/formatTimeRange";
import styles from "./NoticeCard.module.scss";

const cx = classNames.bind(styles);

interface INoticeCardProps {
  hourlyPay: number;
  startsAt: string;
  address: string;
  imageUrl: string;
  shopDescription: string;
  noticeDescription: string;
  closed: boolean;
  workhour: number;
  originalHourlyPay: number;
  children?: React.ReactNode;
}

const getClosedMessage = (isClosed: boolean, isPassed: boolean) => {
  if (isClosed) {
    return "마감 완료";
  }
  if (isPassed) {
    return "지난 공고";
  }
  return null;
};

const getBgColorClass = (percentage: number) => {
  if (percentage > 75) {
    return styles["bg-75-100"];
  }
  if (percentage > 50) {
    return styles["bg-50-75"];
  }
  if (percentage > 25) {
    return styles["bg-25-50"];
  }
  return styles["bg-0-25"];
};

const NoticeCard = ({
  hourlyPay,
  startsAt,
  address,
  imageUrl,
  shopDescription,
  noticeDescription,
  closed,
  workhour,
  originalHourlyPay,
  children,
}: INoticeCardProps) => {
  const isPassed = new Date() > new Date(startsAt);
  const isClosed = closed || isPassed;
  const percentage = calculatePercentage(hourlyPay, originalHourlyPay);
  const bgColorClass = getBgColorClass(percentage);

  return (
    <section className={styles.noticeCardContainer}>
      <div className={styles.noticeCard}>
        <div className={styles.noticeImageContainer}>
          <Image src={imageUrl} className={cx("noticeImage", { isClosed })} alt="notice-card" fill />
          {isClosed && <p className={styles.closedMessage}>{getClosedMessage(closed, isPassed)}</p>}
        </div>
        <div className={styles.noticeAboutContainer}>
          <p className={styles.subtitle}>시급</p>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>
              {hourlyPay.toLocaleString()}
              원
            </h2>
            {percentage >= 5
              && (
                <div className={cx("payPercentage", { isClosed }, `${bgColorClass}`)}>
                  <p>{`기존시급보다 ${percentage}%`}</p>
                  <Image src="/images/arrow-white.svg" className={styles.arrow} width={15} height={15} alt="arrow" />
                </div>
              )}
          </div>
          <div className={styles.timeContainer}>
            <Image src="/images/clock-red.svg" className={styles.icon} alt="location" width={20} height={20} />
            <p className={styles.time}>{formatTimeRange(startsAt, workhour)}</p>
          </div>
          <div className={styles.addressContainer}>
            <Image src="/images/location-red.svg" className={styles.icon} alt="location" width={20} height={20} />
            <p className={styles.address}>{address}</p>
          </div>
          <p className={styles.description}>
            {shopDescription}
          </p>
          <div className={styles.buttonContainer}>
            {children}
          </div>
        </div>
      </div>

      <div className={styles.noticeDescriptionContainer}>
        <h3 className={styles.noticeDescriptionTitle}>공고 설명</h3>
        <p className={styles.noticeDescription}>{noticeDescription}</p>
      </div>
    </section>
  );
};

export default NoticeCard;
