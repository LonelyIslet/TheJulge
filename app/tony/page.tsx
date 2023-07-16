"use client";

import { useState } from "react";
import { CommonBtn, Dropdown } from "components/common";

const page = () => {
  const [data, setData] = useState({});
  const handleData = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <Dropdown
      type="address"
      label="선호 지역"
      id="address"
      name="address"
      essential
      onChange={handleData}
    />
  );
};

export default page;
