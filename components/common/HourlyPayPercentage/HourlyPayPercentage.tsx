import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./HourlyPayPercentage.module.scss";

const cx = classNames.bind(styles);

interface HourlyPayPercentageProps {
  percentage: number;
  isClosed: boolean;
}

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

const getArrowImageSource = (isClosed: boolean, percentage: number) => {
  if (isClosed) {
    return "images/arrow-gray.svg";
  }
  if (percentage > 75) {
    return "images/arrow-red-primary.svg";
  }
  if (percentage > 50) {
    return "images/arrow-red-40.svg";
  }
  if (percentage > 25) {
    return "images/arrow-red-30.svg";
  }
  return "images/arrow-red-20.svg";
};

const HourlyPayPercentage = ({ isClosed, percentage }: HourlyPayPercentageProps) => {
  const bgColorClass = getBgColorClass(percentage);

  if (percentage < 5) {
    return null;
  }

  return (
    <div className={cx("payPercentage", { isClosed }, `${bgColorClass}`)}>
      <p>{`기존시급보다 ${percentage}%`}</p>
      <Image src="images/arrow-white.svg" className={styles.icon} alt="arrow" width={15} height={15} />
      <Image src={getArrowImageSource(isClosed, percentage)} className={styles.iconMobile} alt="arrow" width={15} height={15} />
    </div>
  );
};

export default HourlyPayPercentage;
