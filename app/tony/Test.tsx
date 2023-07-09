"use client";

import React, { useState } from "react";
import { CustomInput } from "components/common";
import { ValidationTarget } from "types/enums/inputValidation.enum";

const Test = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleInputChange = (event:
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CustomInput
          element="text"
          type="email"
          label="이메일"
          placeholder="선택"
          essential
          id="email"
          name="email"
          validationTarget={ValidationTarget.EMAIL}
          data={data}
          onChange={handleInputChange}
        />
        <CustomInput
          element="text"
          type="password"
          label="비밀번호"
          placeholder="선택"
          essential
          id="password"
          name="password"
          validationTarget={ValidationTarget.PASSWORD}
          data={data}
          onChange={handleInputChange}
        />
        <CustomInput
          element="text"
          type="password"
          label="비밀번호 확인"
          placeholder="선택"
          essential
          id="password_confirm"
          name="password_confirm"
          validationTarget={ValidationTarget.PASSWORD_CONFIRM}
          data={data}
          onChange={handleInputChange}
        />
        <CustomInput
          element="text"
          type="number"
          label="시급"
          placeholder="선택"
          id="hourlyPay"
          name="hourlyPay"
          validationTarget={ValidationTarget.HOURLY_PAY}
          onChange={handleInputChange}
        />
        <CustomInput
          element="text"
          type="text"
          label="주소"
          placeholder="선택"
          id="address"
          name="address"
          onChange={handleInputChange}
        />
        <button type="submit">전송하기</button>
      </form>
    </div>
  );
};

export default Test;
