import {
  CommonLayout, ShopCard, NoticeCard, CommonBtn,
} from "components/common";
// import { INotice } from "types/dto";
import noticeData from "constants/mock/notice.json";
// import noticeList from "constants/mock/noticeList.json";
import styles from "@/page.module.scss";

// interface INoticeWithClosedInfo extends INotice {
//   id: string,
//   closed: boolean,
// }

const MyShopPage = () => {
  const {
    hourlyPay,
    startsAt,
    workhour,
    description: noticeDescription,
    closed,
    shop: {
      item: {
        name = "악마",
        address1 = "서울시 강서구",
        imageUrl = "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
        originalHourlyPay = 2,
        category,
        description:
        shopDescription,
      },
    },
  } = noticeData.item;

  // const notice: INoticeWithClosedInfo[] = (
  //   noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

  return (
    <main className={styles.main}>
      <div style={{ marginBottom: "12px" }}>
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
          </article>
        </CommonLayout>
      </div>
      <CommonLayout position="below">
        <header>
          <h2>등록한 공고</h2>
        </header>
        {/* <CardList noticeList={notice} /> */}
      </CommonLayout>
    </main>
  );
};

export default MyShopPage;
