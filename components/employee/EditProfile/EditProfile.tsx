"use client";

import { CommonBtn, CustomInput, Dropdown } from "components/common";
import React, { useState } from "react";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({});

  const handleData = (event) => {
    if (event.type === "click") {
      setData((prev) => {
        return {
          ...prev,
          [event.target.name]: event.target.textContent,
        };
      });
    } else if (event.type === "change") {
      setData((prev) => {
        return {
          ...prev,
          [event.target.name]: event.target.value,
        };
      });
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.inputBox}>
        <CustomInput element="text" type="text" label="이름" placeholder="입력" id="name" name="name" essential onChange={handleData} />
        <CustomInput element="text" type="tel" label="연락처" placeholder="입력" id="phone" name="phone" essential onChange={handleData} validationTarget={ValidationTarget.TEL} />
        <Dropdown type="address" label="선호 지역" id="address" name="address" onChange={handleData} />
      </div>
      <CustomInput element="textarea" label="소개" placeholder="입력" id="bio" name="bio" onChange={handleData} />
      <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE} message="등록하기" />
    </div>
  );
};

export default EditProfile;
