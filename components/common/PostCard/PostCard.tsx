import Link from "next/link";
import Image from "next/image";
import formatTimeRange from "utils/formatTimeRange";
import calculatePercentage from "utils/calculatePercentage";
import classNames from "classnames/bind";
import getBgColorClass from "utils/getBgColorClass";
import styles from "./PostCard.module.scss";
import CustomArrow from "./CustomArrow/CustomArrow";

const cx = classNames.bind(styles);

interface IPostCardProps {
  hourlyPay: number;
  startsAt: string;
  closed: boolean;
  workhour: number;
  name: string;
  address1: string;
  imageUrl: string;
  originalHourlyPay: number;
  href: string;
}

const PostCard = ({
  hourlyPay, startsAt, closed, workhour, name, address1, imageUrl, originalHourlyPay, href,
}: IPostCardProps) => {
  const isPassed = new Date() > new Date(startsAt);
  const isClosed = closed || isPassed;
  const percentage = calculatePercentage(hourlyPay, originalHourlyPay);
  const bgColorClass = getBgColorClass(percentage);

  const getClosedMessage = () => {
    if (closed) {
      return "마감 완료";
    }
    if (isPassed) {
      return "지난 공고";
    }
    return null;
  };

  return (
    <Link href={href} className={cx("postCard", { isClosed })}>
      <div className={styles.postImageContainer}>
        <Image src={imageUrl} className={cx("postImage", { isClosed })} alt="post-card" fill />
        {isClosed && <p className={styles.closedMessage}>{getClosedMessage()}</p>}
      </div>
      <h2 className={cx("name", { isClosed })}>{name}</h2>
      <div className={styles.information}>
        <div className={cx("time", { isClosed })}>
          <Image src={isClosed ? "/images/clock-gray.svg" : "images/clock-red.svg"} className={cx("icon", isClosed)} alt="clock" width={15} height={15} />
          <p>{formatTimeRange(startsAt, workhour)}</p>
        </div>
        <div className={cx("address", { isClosed })}>
          <Image src={isClosed ? "/images/location-gray.svg" : "images/location-red.svg"} className={cx("icon", isClosed)} alt="location" width={15} height={15} />
          <p>{address1}</p>
        </div>
      </div>
      <div className={styles.hourlyPayContainer}>
        <p className={cx("hourlyPay", { isClosed })}>
          {hourlyPay.toLocaleString()}
          원
        </p>
        <div className={cx("payPercentage", { isClosed }, `${bgColorClass}`)}>
          <p>{`기존시급보다 ${percentage}%`}</p>
          <Image src="/images/arrow-white.svg" className={styles.arrowDt} width={15} height={15} alt="arrow" />
          <div className={styles.arrowMb}>
            <CustomArrow isClosed={isClosed} percentage={percentage} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
