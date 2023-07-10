import { CommonBtn, PostCard } from "components/common";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import data from "constants/mock/notice.json";
import styles from "@/page.module.scss";

const Page = () => {
  const {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    shop: {
      href,
      item: {
        name, address1, imageUrl, originalHourlyPay,
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
      <CommonBtn style={ButtonStyle.SOLID} size={ButtonSize.LARGE} type="submit" message="버튼" responsive />
    </main>
  );
};

export default Page;