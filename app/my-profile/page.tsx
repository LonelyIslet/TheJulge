"use client";

import { CommonDetail } from "components/common";
import { DetailType } from "types/enums/detailPage.enum";

const MyPage = () => {
  return (
    <>
      {/* <CommonDetail detailType={DetailType.EMPLOYER} /> */}
      <CommonDetail detailType={DetailType.EMPLOYEE} />
    </>
  );
};

export default MyPage;
