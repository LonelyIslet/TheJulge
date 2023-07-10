import { CommonLayout } from "components/common";

const page = () => {
  return (
    <CommonLayout position="above">
      <header>
        <h2>프로필</h2>
      </header>
      <article>
        <p>내 프로필을 등록하고 원하는 가게에 지원해 보세요.</p>
      </article>
    </CommonLayout>
  );
};

export default page;
