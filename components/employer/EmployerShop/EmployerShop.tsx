import {
  CommonLayout, ShopCard, CardList, CommonDetail,
} from "components/common";
import { INotice } from "types/dto";
import { DetailType } from "types/enums/detailPage.enum";
import noticeData from "constants/mock/notice.json";
import noticeList from "constants/mock/noticeList.json";
import styles from "app/my-shop/page.module.scss";

const EmployerShop = () => {
  interface INoticeWithClosedInfo extends INotice {
    id: string,
    closed: boolean,
  }
  const {
    shop: {
      item: {
        name, address1, imageUrl, category, description: shopDescription,
      },
    },
  } = noticeData.item;

  const shop = {
    name: "악마",
    address1: "서울시 강서구 ",
    imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    originalHourlyPay: 20000,
  };

  const notice: INoticeWithClosedInfo[] = (
    noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

  const hasNotice = true;

  return (
    <div className={styles.shopContainer}>
      <div className={styles.top}>
        <CommonLayout position="above">
          <div>
            <h2>내 가게</h2>
          </div>
          <article>
            <ShopCard
              name={name}
              address={address1}
              imageUrl={imageUrl}
              description={shopDescription}
              category={category}
            />
          </article>
        </CommonLayout>
      </div>
      <div className={styles.bottom}>
        {hasNotice
          ? <CommonDetail detailType={DetailType.NOTICE_DETAILS} />
          : (
            <CommonLayout position="below">
              <h2>내가 등록한 공고</h2>
              <CardList
                noticeList={notice}
                name={shop.name}
                address={shop.address1}
                imageUrl={shop.imageUrl}
                originalHourlyPay={shop.originalHourlyPay}
              />
            </CommonLayout>
          )}
      </div>
    </div>
  );
};

export default EmployerShop;
