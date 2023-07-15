import NoticeCard from "components/common/NoticeCard/NoticeCard";
import CommonBtn from "components/common/CommonBtn/CommonBtn";
import CommonLayout from "components/common/CommonLayout/CommonLayout";

const CommonShopDescription = () => {
  const item = {
    item: {
      id: "5e0d5d6a-81c4-40cd-8e3b-1680f252f696",
      hourlyPay: 30000,
      startsAt: "2023-09-14T18:00:00.000Z",
      workhour: 2,
      description: "오세요",
      closed: false,
      shop: {
        item: {
          id: "02479698-8aeb-4c72-9a20-8381148c11c9",
          name: "진주회관",
          category: "한식",
          address1: "서울시 중구",
          address2: "세종대로11길 26",
          description: "콩국수 맛집",
          imageUrl: "https://bootcamp-project-api.s3.ap-northeast-2.amazonaws.com/0-1/the-julge/1bdb43c8-ff08-4a46-81b0-7f91efced98c-jinju4.png",
          originalHourlyPay: 20000,
        },
        href: "/api/0-2/the-julge/shops/02479698-8aeb-4c72-9a20-8381148c11c9",
      },
    },
  };
  const {
    hourlyPay, startsAt, workhour, description: shopDescription, closed, shop,
  } = item.item;

  const {
    address1, imageUrl, description: noticeDescription, originalHourlyPay,
  } = shop.item;
  return (
    <CommonLayout position="above">
      <div>
        <p>식당</p>
        <h2>도토리 식당</h2>
      </div>
      <div>
        <NoticeCard
          hourlyPay={hourlyPay}
          startsAt={startsAt}
          address1={address1}
          imageUrl={imageUrl}
          shopDescription={shopDescription}
          noticeDescription={noticeDescription}
          closed={closed}
          workhour={workhour}
          originalHourlyPay={originalHourlyPay}
        >
          <CommonBtn>신청하기</CommonBtn>
        </NoticeCard>
      </div>
    </CommonLayout>
  );
};

export default CommonShopDescription;
