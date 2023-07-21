"use client";

import React, { useEffect, useState } from "react";
import { DetailType } from "types/enums/detailPage.enum";
import {
  CommonLayout, CardList, CommonDetail, Loader,
} from "components/common";
import useAppSelector from "redux/hooks/useAppSelector";
import { INotice, IShop } from "types/dto";
import { useGetNoticesByShopIdQuery } from "redux/api/noticeApi";

interface INoticeWithClosedInfo extends INotice {
  id?: string;
  closed: boolean;
}

const MyNotice = () => {
  const myShop = useAppSelector((state) => { return state.user.userInfo?.shop?.item; }) as IShop;
  const [notice, setNotice] = useState<INoticeWithClosedInfo[]>([]);
  const { data: noticeListData, isLoading, isSuccess } = useGetNoticesByShopIdQuery({
    shopId: myShop.id as string, params: { offset: 0 },
  });
  useEffect(() => {
    if (noticeListData) {
      setNotice(noticeListData.items.map((i) => { return { ...i.item, shop: { item: myShop, href: "" } }; }));
    }
  }, [noticeListData, myShop]);
  if (isLoading || !isSuccess || !noticeListData) {
    return (
      <div>
        <Loader />
        <p>공고 데이터를 불러오는 중입니다...</p>
      </div>
    );
  }
  return notice.length !== 0 ? (
    <CommonLayout position="below">
      <h2>내가 등록한 공고</h2>
      <CardList
        noticeList={notice}
      />
    </CommonLayout>
  ) : (
    <CommonDetail detailType={DetailType.NOTICE_DETAILS as DetailType} shopId={myShop.id} />
  );
};

export default MyNotice;
