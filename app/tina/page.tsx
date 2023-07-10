import { PostCard } from "components/common";
import styles from "@/page.module.scss";
import data from "constants/mock/notice.json";

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
    </main>
  );
};

export default Page;
