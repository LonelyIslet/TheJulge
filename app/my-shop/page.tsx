"use client";

import React, {
  useState, useEffect, useCallback, useRef, SetStateAction,
} from "react";
import { MyShop, MyNotice } from "components/employer";
import { INotice } from "types/dto";
import { withAuth, withUserType } from "components/hocs";
import { UserType } from "types/enums/user.enum";
import noticeList from "constants/mock/noticeList.json";
import useAppSelector from "redux/hooks/useAppSelector";
import { useGetUserInfoQuery } from "redux/api/userApi";
import { CommonDetail, Loader } from "components/common";
import { DetailType } from "types/enums/detailPage.enum";
import { useGetNoticesByShopIdQuery, useGetNoticesQuery } from "redux/api/noticeApi";
import styles from "./page.module.scss";

interface IShopCard {
  name: string,
  address1: string,
  imageUrl: string,
  description: string,
  category: string,
}

interface IData {
  [key: string]: string | number;
}

interface INoticeWithClosedInfo extends INotice {
  id: string,
  closed: boolean,
}

// /shops/{shop_id}/notices

const MyShopPage = () => {
  const [shopData, setShopData] = useState<IData | null>(null);
  const [noticeData, setNoticeData] = useState([]);
  const user = useAppSelector((state) => { return state.user; });
  const { userInfo } = user;
  const userId = userInfo?.id as string;
  const { data, isLoading } = useGetUserInfoQuery(userId);
  // const { data: noticeData } = useGetNoticesQuery(shopId);
  const { data: NData, isLoading: noticeIsLoading } = useGetNoticesQuery(shopData?.id, { offset: 0 });

  useEffect(() => {
    if (!isLoading && !noticeIsLoading && data?.item.shop) {
      const initialShopData = {
        id: data.item.shop.item.id,
        name: data.item.shop.item.name,
        address1: data.item.shop.item.address1,
        imageUrl: data.item.shop.item.imageUrl,
        description: data.item.shop.item.description,
        category: data.item.shop.item.category,
      };
      setShopData(initialShopData as SetStateAction<IShopCard>);
      setNoticeData(NData?.items.map(({ item }) => { return item; }) as INotice[]);
    }
  }, [data, isLoading, NData]);

  console.log(noticeData);

  return (
    <div>
      <div className={styles.top}>
        {
          shopData
            ? (
              <MyShop
                name={shopData.name}
                address={shopData.address1}
                imageUrl={shopData.imageUrl}
                description={shopData.description}
                category={shopData.category}
              />
            )
            : <CommonDetail detailType={DetailType.EMPLOYER} />
        }
      </div>
      <div className={styles.bottom}>
        <MyNotice
          noticeList={noticeData}
        />
      </div>
    </div>
  );
};

export default withAuth(withUserType(MyShopPage, UserType.EMPLOYER));
