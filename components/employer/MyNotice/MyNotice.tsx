"use client";

import React from "react";
import { DetailType } from "types/enums/detailPage.enum";
import noticeList from "constants/mock/noticeList.json";
import {
  CommonLayout, CardList, CommonDetail,
} from "components/common";
import useAppSelector from "redux/hooks/useAppSelector";
import { INotice, IShop } from "types/dto";

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

interface IShopData {
  item: IShop,
  href: string
}

const notice: INoticeWithClosedInfo[] = (
  noticeList.items as { item: INoticeWithClosedInfo }[]).map(({ item }) => { return item; });

const MyNotice = () => {
  const data = useAppSelector((state) => { return state.user.userInfo?.shop; }) as IShopData;
  const shop = {
    id: data?.item.id,
  };

  return noticeList.items?.length !== 0 ? (
    <CommonLayout position="below">
      <h2>내가 등록한 공고</h2>
      <CardList
        noticeList={notice}
      />
    </CommonLayout>
  ) : (
    <CommonDetail detailType={DetailType.NOTICE_DETAILS as DetailType} shopId={shop?.id} />
  );
};

export default MyNotice;
