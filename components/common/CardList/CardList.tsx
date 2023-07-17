import PostCard from "components/common/PostCard/PostCard";
import { INotice } from "types/dto";
import styles from "./CardList.module.scss";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

interface CardListProps {
  noticeList: INoticeWithClosedInfo[],
}

const CardList = ({
  noticeList,
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
              name={i.shop?.item.name}
              address={i.shop?.item.address}
              imageUrl={i.shop?.item.imageUrl}
              originalHourlyPay={i.shop?.item.originalHourlyPay}
              href={`/notice?id=${i.id}`}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
