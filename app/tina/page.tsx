import {
  CardList, CommonBtn, NoticeCard, PostCard, ShopCard,
} from "components/common";
import { INotice } from "types/dto";
import data from "constants/mock/notice.json";
import noticeList from "constants/mock/noticeList.json";
import styles from "@/page.module.scss";

const Page = () => {
  interface INoticeWithClosedInfo extends INotice {
    id: string,
    closed: boolean,
  }
  const {
    hourlyPay,
    startsAt,
    workhour,
    description: noticeDescription,
    closed,
    shop: {
      href,
      item: {
        name, address1, imageUrl, originalHourlyPay, category, description: shopDescription,
      },
    },
  } = data.item;

  const shop = {
    name: "악마",
    address1: "서울시 강서구 ",
    imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    originalHourlyPay: 2,
  };

  const notice: INoticeWithClosedInfo[] = (
    noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

  return (
    <main className={styles.main}>
      <PostCard
        hourlyPay={hourlyPay}
        startsAt={startsAt}
        workhour={workhour}
        closed={closed}
        name={name}
        address={address1}
        imageUrl={imageUrl}
        originalHourlyPay={originalHourlyPay}
        href={href}
      />
      <ShopCard
        name={name}
        address={address1}
        imageUrl={imageUrl}
        description={shopDescription}
        category={category}
      />
      <NoticeCard
        hourlyPay={hourlyPay}
        startsAt={startsAt}
        address={address1}
        imageUrl={imageUrl}
        shopDescription={shopDescription}
        noticeDescription={noticeDescription}
        closed={closed}
        workhour={workhour}
        originalHourlyPay={originalHourlyPay}
      >
        <CommonBtn responsive>신청하기</CommonBtn>
      </NoticeCard>
      <CardList
        noticeList={notice}
        name={shop.name}
        address={shop.address1}
        imageUrl={shop.imageUrl}
        originalHourlyPay={originalHourlyPay}
      />
    </main>
  );
};

export default Page;
