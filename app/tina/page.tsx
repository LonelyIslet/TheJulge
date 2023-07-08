import { PostCard } from "components/common";
import styles from "@/page.module.scss";
import data from "constants/mock/notice.json";

const Page = async () => {
  const {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    shop: {
      href,
      item: { name, address1, imageUrl, originalHourlyPay },
    },
  } = data.item;
  
  const postCardProps = {
    hourlyPay,
    startsAt,
    workhour,
    closed,
    name,
    address1,
    imageUrl,
    originalHourlyPay,
    href,
  };

  return (
    <main className={styles.main}>
      <PostCard {...postCardProps}/>
    </main>
  );
};

export default Page;
