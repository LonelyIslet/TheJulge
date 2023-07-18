import { CommonLayout } from "components/common";
import styles from "./HomePageHero.module.scss";

const HomePageHero = () => {
  return (
    <CommonLayout position="below">
      <div className={styles.noticeWrapper}>
        <h2>맞춤 공고</h2>
        <div className={styles.premiumNoticeList}>
          {/* <CardList /> */}
        </div>
      </div>
    </CommonLayout>
  );
};

export default HomePageHero;
