"use client";

import { CommonLayout, NoticeCard, CommonBtn } from "components/common";
import styles from "./page.module.scss";

const NoticePage = () => {
  // 1. 사장 페이지와 알바생 페이지 구분
  // 2. 레이아웃은 동일함
  // 3. 데이터 응답에서 온 type을 받아 사장과 알바생을 구분하여 페이지를 제작해야됨
  const type: "employee" | "employer" = "employee";
  return (
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
  );
};

export default NoticePage;
