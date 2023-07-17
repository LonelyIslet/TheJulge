"use client";

import { FormEvent, useState } from "react";
import { CommonBtn, CustomInput, Dropdown } from "components/common";
import { ButtonSize, ButtonStyle } from "types/enums/button.enum";
import { ValidationTarget } from "types/enums/inputValidation.enum";
import inputValidation from "utils/inputValidation";
import { ADDRESS } from "constants/dropdown/dropdownData";
import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [rendering, setRendering] = useState(false);

  const [countValidation, setCountValidation] = useState({
    name: 0,
    phone: 0,
    address: 0,
    bio: 0,
  });

  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    bio: "",
  });

  const handleData = (event:
  React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> |
  React.MouseEvent<HTMLButtonElement>) => {
    if (event.type === "click") {
      const target = event.target as HTMLButtonElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.textContent,
        };
      });
    } else if (event.type === "change") {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      setData((prev) => {
        return {
          ...prev,
          [target.name]: target.value,
        };
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRendering(!rendering);
    setCountValidation({
      name: 1,
      phone: 1,
      address: 1,
      bio: 1,
    });

    const isContainedAddress = ADDRESS.includes(data.address);
    // 유효성 검사 완료 시 실행되는 함수 입력하면 됩니다.
    if (data.name.length && inputValidation(
      ValidationTarget.PHONE,
      data.phone,
    // eslint-disable-next-line no-empty
    ) && isContainedAddress && data.bio.length) {

    }
  };

  return (
    <div className={styles.layout}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <CustomInput
            element="text"
            type="text"
            label="이름"
            placeholder="입력"
            id="name"
            name="name"
            essential
            onChange={handleData}
            validationTarget={ValidationTarget.ESSENTIAL}
            data={data}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <CustomInput
            element="text"
            type="tel"
            label="연락처"
            placeholder="입력"
            id="phone"
            name="phone"
            essential
            onChange={handleData}
            validationTarget={ValidationTarget.PHONE}
            data={data}
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
          <Dropdown
            type="address"
            label="선호 지역"
            id="address"
            name="address"
            onChange={handleData}
            essential
            rendering={rendering}
            countValidation={countValidation}
            setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
          />
        </div>
        <CustomInput
          element="textarea"
          label="소개"
          placeholder="입력"
          id="bio"
          name="bio"
          onChange={handleData}
          essential
          validationTarget={ValidationTarget.ESSENTIAL}
          data={data}
          rendering={rendering}
          countValidation={countValidation}
          setCountValidation={setCountValidation as React.Dispatch<React.SetStateAction<object>>}
        />
        <CommonBtn type="submit" style={ButtonStyle.SOLID} size={ButtonSize.LARGE}>등록하기</CommonBtn>
      </form>
    </div>
  );
};

export default EditProfile;
