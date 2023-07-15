"use client";

import { CommonLayout, NoticeCard, CommonBtn } from "components/common";
import EmployeeNotice from "components/employee/EmployeeNotice/EmployeeNotice";
import styles from "./page.module.scss";

const NoticePage = () => {
  // 1. 사장 페이지와 알바생 페이지 구분
  // 2. 레이아웃은 동일함
  // 3. 데이터 응답에서 온 type을 받아 사장과 알바생을 구분하여 페이지를 제작해야됨
  const type: "employee" | "employer" = "employee";
  return (
    <EmployeeNotice />
  );
};

export default NoticePage;
