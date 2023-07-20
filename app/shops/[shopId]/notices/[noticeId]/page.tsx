/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { CommonShopDescription, CommonDetail } from "components/common";
import { EmployerNotice } from "components/employer";
import { EmployeeNotice } from "components/employee";
import useAppSelector from "redux/hooks/useAppSelector";
import styles from "./page.module.scss";

const NoticePage = () => {
  const user = useAppSelector((state) => { return state.user; });

  // 사장이지만 본인 가게가 아닌 경우 최근에 본 공고 보여줌
  // 사장이지만 본인 가게면 신청자 목록을 보여줌

  return (
    <>
      <div className={styles.top}>
        <CommonShopDescription user={user.userInfo} />
      </div>
      <div className={styles.bottom}>
        {(user?.userInfo?.type === "employee"
        || user?.userInfo?.type === undefined)
        && <EmployeeNotice />}
        {user?.userInfo?.type === "employer" && <EmployerNotice />}
      </div>
    </>
  );
};

export default NoticePage;
