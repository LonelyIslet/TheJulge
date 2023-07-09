"use client";

import React, { useState } from "react";
import CustomInput from "components/common/CustomInput/CustomInput";

const Page = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    // checkingPassword: ''
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(data)
  };

  const handleInputChange = (event:
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement>) => {
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
          validationType="email"
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
          validationType="password"
          data={data}
          onChange={handleInputChange}
        />
        <CustomInput
          element="text"
          type="password"
          label="비밀번호 확인"
          placeholder="선택"
          essential
          id="checkingPassword"
          name="checkingPassword"
          validationType="checkingPassword"
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
          validationType="hourlyPay"
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

export default Page;
