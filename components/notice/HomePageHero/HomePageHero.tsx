import { CommonLayout } from "components/common";
import RecommendedNoticeList from "components/notice/RecommendedNoticeList/RecommendedNoticeList";

const HomePageHero = () => {
  return (
    <CommonLayout position="below">
      <div>
        <h2>맞춤 공고</h2>
      </div>
      <RecommendedNoticeList />
    </CommonLayout>
  );
};

export default HomePageHero;
