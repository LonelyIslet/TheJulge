"use client";

import { CommonDetail, CommonLayout } from "components/common";
import RegisteredMyProfile from "components/employee/RegisteredMyProfile/RegisteredMyProfile";
import { DetailType } from "types/enums/detailPage.enum";

const MyPage = () => {
  return (
    <>
      <RegisteredMyProfile />
      <CommonDetail detailType={DetailType.APPLICATIONDETAILS} onClick={() => { return window.alert("안녕하세요"); }} />
    </>
  );
};

export default MyPage;
