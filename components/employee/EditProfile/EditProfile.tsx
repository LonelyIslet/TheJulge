"use client";

import { CommonBtn, CustomInput, Dropdown } from "components/common";
import { useState } from "react";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  const [data, setData] = useState();

  const handleData = (e) => {
    setData((prev) => return {...prev, [e.target.name]: e.target.value})
  }

  return (
    <div className={styles.layout}>
      <div className={styles.inputBox}>
        <CustomInput element="text" type="text" label="이름" placeholder="입력" id="name" name="이름" essential />
        <CustomInput element="text" type="text" label="연락처" placeholder="입력" id="phone" name="phone" essential />
        <Dropdown category="location" label="선호 지역" id="address" name="address" />
      </div>
      <CustomInput element="textarea" label="소개" placeholder="입력" id="bio" name="bio" />
      <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE} message="등록하기" />
    </div>
  );
};

export default EditProfile;
