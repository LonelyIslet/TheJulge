import PostCard from "components/common/PostCard/PostCard";
import { INotice } from "types/dto";
import styles from "./CardList.module.scss";

interface CardListProps {
  noticeList: INotice[],
}

const CardList = ({
  noticeList,
}: CardListProps) => {
  return (
    <ul className={styles.cardList}>
      {noticeList?.map((i) => {
        return (
          <li key={i.id} className={styles.card}>
            <PostCard
              hourlyPay={i.hourlyPay}
              startsAt={i.startsAt}
              workhour={i.workhour}
              closed={i.closed}
              name={i.shop?.item.name}
              address={i.shop?.item.address1}
              imageUrl={i.shop?.item.imageUrl || ""}
              originalHourlyPay={i.shop?.item.originalHourlyPay}
              href={`/shops/${i.shop?.item.id as string}/notices/${i.id}`}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
