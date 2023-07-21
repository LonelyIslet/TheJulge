/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { CommonShopDescription, CommonDetail } from "components/common";
import { EmployerNotice } from "components/employer";
import { EmployeeNotice } from "components/employee";
import useAppSelector from "redux/hooks/useAppSelector";
import { useParams } from "next/navigation";
import styles from "./page.module.scss";

const NoticePage = () => {
  const params = useParams();
  const user = useAppSelector((state) => { return state.user; });

  return (
    <>
      <div className={styles.top}>
        <CommonShopDescription user={user.userInfo} />
      </div>
      <div className={styles.bottom}>
        {user?.userInfo?.shop?.item?.id === params.shopId ? <EmployerNotice /> : <EmployeeNotice />}
      </div>
    </>
  );
};

export default NoticePage;
