import {
  CommonLayout, NoticeCard, CommonBtn, CardList,
} from "components/common";
import noticeData from "constants/mock/notice.json";
import noticeList from "constants/mock/noticeList.json";
import { INotice } from "types/dto";
import styles from "app/notice/page.module.scss";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

const EmployeeNotice = () => {
  const notice: INoticeWithClosedInfo[] = (
    noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

  const {
    hourlyPay,
    startsAt,
    workhour,
    description: noticeDescription,
    closed,
    shop: {
      item: {
        name, address1, imageUrl, originalHourlyPay, category, description: shopDescription,
      },
    },
  } = noticeData.item;

  const shop = {
    name: "악마",
    address1: "서울시 강서구 ",
    imageUrl: "https://images.unsplash.com/photo-1630906086851-65a063a8cdd5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    originalHourlyPay: 2,
  };
  return (
    <>
      <div className={styles.top}>
        <CommonLayout position="above">
          <div>
            <p>식당</p>
            <h2>도토리 식당</h2>
          </div>
          <div>
            <NoticeCard
              hourlyPay={15000}
              startsAt="2023-09-14T18:00:00.000Z"
              address1="서울시 송파구"
              imageUrl="https://dimg.donga.com/wps/NEWS/IMAGE/2021/01/17/104953245.2.jpg"
              shopDescription="알바하기 편한 너구리네 라면집!
            라면 올려두고 끓이기만 하면 되어서 쉬운 편에 속하는 가게입니다."
              noticeDescription="기존 알바 친구가 그만둬서 새로운 친구를 구했는데, 그 사이에 하루가 비네요.
            급해서 시급도 높였고 그렇게 바쁜 날이 아니라서 괜찮을거예요."
              closed
              workhour={3}
              originalHourlyPay={10000}
            >
              <CommonBtn>신청하기</CommonBtn>
            </NoticeCard>
          </div>
        </CommonLayout>
      </div>
      <div className={styles.bottom}>
        <CommonLayout position="below">
          <div>
            <h2>최근에 본 공고</h2>
          </div>
          <div>
            <CardList
              noticeList={notice}
              name={shop.name}
              address={shop.address1}
              imageUrl={shop.imageUrl}
              originalHourlyPay={originalHourlyPay}
            />
          </div>
        </CommonLayout>
      </div>
    </>
  );
};

export default EmployeeNotice;
