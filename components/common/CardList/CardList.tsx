import PostCard from "components/common/PostCard/PostCard";
import { INotice } from "types/dto";
import styles from "./CardList.module.scss";

interface INoticeWithTypeInfo extends INotice {
  id: string,
  closed: boolean,
}

interface CardListProps {
  noticeList: INoticeWithTypeInfo[],
  name: string,
  imageUrl: string,
  address: string,
  originalHourlyPay: number,
  shopId: string,
}

const CardList = ({
  noticeList, name, imageUrl, address, originalHourlyPay, shopId,
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
              href={`/api/0-2/the-julge/shops/${shopId}/notices/${i.id}`}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CardList;
