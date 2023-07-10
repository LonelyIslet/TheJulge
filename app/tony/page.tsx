import CommonLayout from "components/common/CommonLayout/CommonLayout";
import React from "react";

const page = () => {
  return (
    <div>
      <CommonLayout position="above">
        <header>
          <p>식당</p>
          <h2>도토리 식당</h2>
        </header>
        <article>
          그 외 다른 기능들
        </article>
      </CommonLayout>
      <CommonLayout position="below">
        <header>
          <p>식당</p>
          <h2>도토리 식당</h2>
        </header>
        <article>
          그 외 다른 기능들
        </article>
      </CommonLayout>
    </div>
  );
};

export default page;
