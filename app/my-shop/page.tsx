"use client";

import React from "react";
import { MyShop, MyNotice } from "components/employer";
import { withAuth, withUserType } from "components/hocs";
import { UserType } from "types/enums/user.enum";
import useAppSelector from "redux/hooks/useAppSelector";
import { CommonDetail } from "components/common";
import { DetailType } from "types/enums/detailPage.enum";
import { IShop } from "types/dto";
import styles from "./page.module.scss";

interface IShopData {
  item: IShop,
  href: string
}

const MyShopPage = () => {
  const data = useAppSelector((state) => { return state.user.userInfo?.shop; }) as IShopData;
  const shop = {
    id: data.item.id,
    name: data.item.name,
    address1: data.item.address1,
    imageUrl: data.item.imageUrl,
    description: data.item.description,
    category: data.item.category,
  };

  if (!data) {
    return (
      <div className={styles.top}>
        <CommonDetail detailType={DetailType.EMPLOYER} />
      </div>
    );
  }

  return (
    <>
      <div className={styles.top}>
        <MyShop
          id={shop.id as string}
          name={shop.name}
          address={shop.address1}
          imageUrl={shop.imageUrl as string}
          description={shop.description as string}
          category={shop.category}
        />
      </div>
      <div className={styles.bottom}>
        <MyNotice shopId={shop.id as string}/>
      </div>
    </>
  );
};

export default withAuth(withUserType(MyShopPage, UserType.EMPLOYER));
