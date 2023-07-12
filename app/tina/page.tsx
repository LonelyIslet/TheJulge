import {
  CommonBtn, PostCard, NoticeCard, ShopCard,
} from "components/common";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import data from "constants/mock/notice.json";
import styles from "@/page.module.scss";

const Page = () => {
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

  return (
    <main className={styles.main}>
      <PostCard
        hourlyPay={hourlyPay}
        startsAt={startsAt}
        workhour={workhour}
        closed={closed}
        name={name}
        address1={address1}
        imageUrl={imageUrl}
        originalHourlyPay={originalHourlyPay}
        href={href}
      />
      <ShopCard
        name={name}
        address1={address1}
        imageUrl={imageUrl}
        description={shopDescription}
        category={category}
      />
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
        <CommonBtn
          message="신청하기"
          responsive
        />
      </NoticeCard>
      <CommonBtn
        style={ButtonStyle.OUTLINE}
        size={ButtonSize.LARGE}
        type="submit"
        message="버튼"
        responsive
      />
    </main>
  );
};

export default Page;
