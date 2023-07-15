"use client";

import { useState } from "react";
import {
  CommonLayout, NoticeCard, CommonBtn, CommonDetail,
} from "components/common";
import CommonShopDescription from "components/common/CommonShopDescription/CommonShopDescription";
import EmployeeNotice from "components/employee/EmployeeNotice/EmployeeNotice";
import EmployerNotice from "components/employer/EmployerNotice/EmployerNotice";
import { EmployerTable } from "components/notice";
import { DetailType } from "types/enums/detailPage.enum";
import styles from "./page.module.scss";

const NoticePage = () => {
  // 1. 사장 페이지와 알바생 페이지 구분
  // 2. 레이아웃은 동일함
  // 3. 데이터 응답에서 온 type을 받아 사장과 알바생을 구분하여 페이지를 제작해야됨
  // 4. 사장 페이지와 알바생 페이지에서 식당 상세 컴포넌트는 동일하게 활용됨 <- 이걸 하나로 묶자!
  // 5. 사장페이지에서 below는 신청 내역이 보이며 알바생페이지에서는 내가 현재까지 본 공고 리스트가 나와야한다.

  // 1. 비회원일 경우 최근에 본 공고를 볼 수 없으므로 로그인 버튼을 보여줘야한다. - 완료
  // 2. 비회원일 경우 CommonShopDescription의 버튼을 누르면 로그인 페이지로 이동
  // 3. 자신이 올린 공고의 사장일 경우 CommonShopDescription 의 버튼을 disabled 설정

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <div className={styles.top}>
        <CommonShopDescription />
      </div>
      <div className={styles.bottom}>
        {isLoggedIn && <EmployeeNotice />}
        {!isLoggedIn && <CommonDetail detailType={DetailType.LOGIN} />}
      </div>
    </div>
  );
};

export default NoticePage;
