"use client";

import React, { useState } from "react";
import { useGetNoticesByShopIdQuery } from "redux/api/noticeApi";
// import Loader, {
//   CommonLayout, CardList, CommonDetail,
// } from "components/common";

import { DetailType } from "types/enums/detailPage.enum";

const MyNotice = (
  shopId: string,
) => {
  const { data, isLoading } = useGetNoticesByShopIdQuery({
    shopId,
    params: {
      offset: 10,
      limit: 10,
    },
  });

  if (!isLoading) {
    console.log(`notice: ${data}`);
  }
  return <></>;

  // return noticeList?.length !== 0 ? (
  //   <CommonLayout position="below">
  //     <h2>내가 등록한 공고</h2>
  //     <CardList
  //       noticeList={noticeList}
  //     />
  //   </CommonLayout>
  // ) : (
  //   <CommonDetail detailType={DetailType.NOTICE_DETAILS as DetailType} shopId={shopId} />
  // );
};

export default MyNotice;
