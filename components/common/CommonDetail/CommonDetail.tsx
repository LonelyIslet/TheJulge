"use client";

import React from "react";
import { ButtonStyle, ButtonSize } from "types/enums/button.enum";
import styles from "./CommonDetail.module.scss";
import CommonLayout from "../CommonLayout/CommonLayout";
import CommonBtn from "../CommonBtn/CommonBtn";

const CommonDetail = () => {
  return (
    <div className={styles.layout}>
      <CommonLayout position="above">
        <div>
          <h2>프로필</h2>
        </div>
        <div>
          <p>내 프로필을 등록하고 원하는 가게에 지원해 보세요.</p>
          <CommonBtn type={ButtonStyle.SOLID} size={ButtonSize.MEDIUM} message="내 프로필 등록하기" onClick={() => { return console.log("안녕"); }} />
        </div>
      </CommonLayout>
    </div>
  );
};

export default CommonDetail;
