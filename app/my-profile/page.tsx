"use client";

import { CommonDetail } from "components/common";
import RegisteredMyProfile from "components/employee/RegisteredMyProfile/RegisteredMyProfile";
import { DetailType } from "types/enums/detailPage.enum";

const MyPage = () => {
  return (
    <>
      {/* <CommonDetail detailType={DetailType.EMPLOYER} /> */}
      {/* <CommonDetail detailType={DetailType.EMPLOYEE} /> */}
      <RegisteredMyProfile />
    </>
  );
};

export default MyPage;
