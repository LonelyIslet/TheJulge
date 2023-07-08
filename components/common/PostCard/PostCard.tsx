import Link from "next/link";
import { HourlyPayPercentage } from "components/common";
import Image from "next/image";
import styles from "./PostCard.module.scss";
import formatTimeRange from "utils/formatTimeRange";
import calculatePercentage from "utils/calculatePercentage";

interface PostCardProps {
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
  hourlyPay, startsAt, closed, workhour, name, address1, imageUrl, originalHourlyPay, href
}: PostCardProps) => {

 const passed = new Date() > new Date(startsAt);
 const isClosed = closed || passed;
 const percentage = calculatePercentage(hourlyPay, originalHourlyPay)
 
 const getClosedMessage = () => {
  if (closed) {
    return "마감 완료";
  }
  if (passed) {
    return "지난 공고";
  }
  return null;
}

  return (
    <Link href={href} className={`${styles.postCard} ${isClosed && styles.closed}`}>
      <div className={styles.postImageContainer}>
        <Image src={imageUrl} className={`${styles.postImage} ${isClosed && styles.closed}`} alt="post-card" fill/>
        {isClosed && <p className={styles.closedMessage}>{getClosedMessage()}</p>}
      </div>
      <h2 className={`${styles.name} ${isClosed && styles.closed}`}>{name}</h2>
      <div className={styles.information}>
        <div className={`${styles.time} ${isClosed && styles.closed}`}>
          <Image src={isClosed ? "images/clock-gray.svg" : "images/clock-red.svg" } className={`${styles.icon} ${isClosed && styles.closed}`} alt="clock" width={15} height={15} />
          <p>{formatTimeRange(startsAt, workhour)}</p>
        </div>
        <div className={`${styles.address} ${isClosed && styles.closed}`}>
          <Image src={isClosed ? "images/location-gray.svg" : "images/location-red.svg" } className={`${styles.icon} ${isClosed && styles.closed}`} alt="location" width={15} height={15} />
          <p>{address1}</p>
        </div>
      </div>
      <div className={styles.hourlyPayContainer}>
        <p className={`${styles.hourlyPay} ${isClosed && styles.closed}`}>{hourlyPay.toLocaleString()}원</p>
        <HourlyPayPercentage percentage={percentage} isClosed={isClosed} />
      </div>
    </Link>
  );
};

export default PostCard;
