import PostCard from "components/common/PostCard/PostCard";
import { INotice } from "types/dto";
import styles from "./CardList.module.scss";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

interface CardListProps {
  noticeList: INoticeWithClosedInfo[],
  name: string,
  imageUrl: string,
  address: string,
  originalHourlyPay: number,
}

const CardList = ({
  noticeList,
  name,
  imageUrl,
  address,
  originalHourlyPay,
}: CardListProps) => {
  return (
    <ul className={styles.cardList}>
      {noticeList.map((i) => {
        return (
          <li key={i.id} className={styles.card}>
            <PostCard
              hourlyPay={i.hourlyPay}
              startsAt={i.startsAt}
              workhour={i.workhour}
              closed={i.closed}
              name={name}
              address={address}
              imageUrl={imageUrl}
              originalHourlyPay={originalHourlyPay}
              href={`/notice?id=${i.id}`}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
