"use client";

import { MyShop, MyNotice } from "components/employer";
import { INotice } from "types/dto";
import noticeList from "constants/mock/noticeList.json";
import styles from "./page.module.scss";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

// interface INoticeWithClosedInfo extends INotice {
//   id: string,
//   closed: boolean,
// }

const MyShopPage = () => {
  const notice: INoticeWithClosedInfo[] = (
    noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

  const shop = {
    name: "악마",
    address1: "서울시 강서구 ",
    imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    category: "카페",
    description: "카페 설명임",
    originalHourlyPay: 20000,
  };

  return (
    <div>
      <div className={styles.top}>
        <MyShop
          name={shop.name}
          address={shop.address1}
          imageUrl={shop.imageUrl}
          description={shop.description}
          category={shop.category}
        />
      </div>
      <div className={styles.bottom}>
        <MyNotice
          noticeList={notice}
          name={shop.name}
          address={shop.address1}
          imageUrl={shop.imageUrl}
          originalHourlyPay={shop.originalHourlyPay}
        />
      </div>
    </div>
  );
};

export default MyShopPage;
