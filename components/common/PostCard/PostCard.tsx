"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames/bind";
import Tooltip from "components/common/Tooltip/Tooltip";
import calculatePercentage from "utils/common/calculatePercentage";
import formatTimeRange from "utils/common/formatTimeRange";
import getBgColorClass from "utils/common/getBgColorClass";
import { setViewHistory } from "redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { INotice } from "types/dto";
import extractPathVariable from "utils/divideShopIdAndNoticeId";
import CustomArrow from "./CustomArrow/CustomArrow";
import styles from "./PostCard.module.scss";

const cx = classNames.bind(styles);

interface PostCardProps {
  hourlyPay: number;
  startsAt: string;
  closed: boolean;
  workhour: number;
  name: string;
  address: string;
  imageUrl: string;
  originalHourlyPay: number;
  href: string;
}

const PostCard = ({
  hourlyPay,
  startsAt,
  closed,
  workhour,
  name,
  address,
  imageUrl,
  originalHourlyPay,
  href,
}: PostCardProps) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const isPassed = new Date() > new Date(startsAt);
  const isClosed = closed || isPassed;
  const percentage = calculatePercentage(hourlyPay, originalHourlyPay);
  const bgColorClass = getBgColorClass(percentage);
  const dispatch = useDispatch();

  const addViewHistoryItem = () => {
    const viewHistoryItems = extractPathVariable(href);
    const viewHistoryItem: INotice = {
      id: viewHistoryItems.noticesId,
      hourlyPay,
      startsAt,
      workhour,
      closed,
      shop: {
        item: {
          id: viewHistoryItems.shopsId,
          imageUrl,
          address1: address,
          originalHourlyPay,
          name,
        },
      },
    };
    dispatch(setViewHistory(viewHistoryItem));
  };

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
    <Link href={href} className={styles.postCardContainer} onClick={addViewHistoryItem}>
      <div className={cx("postCard", { isClosed })}>
        <div className={styles.postImageContainer}>
          <Image
            src={imageUrl}
            className={cx("postImage", { isClosed })}
            alt="Post Card"
            fill
            priority
          />
          {isClosed && <p className={styles.closedMessage}>{getClosedMessage()}</p>}
        </div>
        <h2 className={cx("name", { isClosed })}>{name}</h2>
        <div className={styles.information}>
          <div className={cx("time", { isClosed })}>
            <Image
              src={isClosed ? "/images/clock-gray.svg" : "images/clock-red.svg"}
              className={cx("icon", isClosed)}
              alt="Clock"
              width={15}
              height={15}
            />
            <p>{formatTimeRange(startsAt, workhour)}</p>
          </div>
          <div className={cx("address", { isClosed })}>
            <Image
              src={isClosed ? "/images/location-gray.svg" : "images/location-red.svg"}
              className={cx("icon", isClosed)}
              alt="Location"
              width={15}
              height={15}
            />
            <p>{address}</p>
          </div>
        </div>
        <div className={styles.hourlyPayContainer}>
          <p
            className={cx("hourlyPay", { isClosed })}
            onMouseEnter={() => { setIsTooltipVisible(true); }}
            onMouseLeave={() => { setIsTooltipVisible(false); }}
          >
            {hourlyPay.toLocaleString()}
            원
          </p>
          <Tooltip isVisible={isTooltipVisible} message={`${hourlyPay.toLocaleString()}원`} />
          {percentage >= 5
            && (
              <div className={cx("payPercentage", { isClosed }, `${bgColorClass}`)}>
                <p>{`기존시급보다 ${percentage}%`}</p>
                <Image
                  src="/images/arrow-white.svg"
                  className={styles.arrowDt}
                  alt="Arrow"
                  width={15}
                  height={15}
                />
                <div className={styles.arrowMb}>
                  <CustomArrow isClosed={isClosed} percentage={percentage} />
                </div>
              </div>
            )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
