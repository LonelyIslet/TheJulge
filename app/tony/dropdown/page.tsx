"use client";

import Dropdown from "components/common/Dropdown/Dropdown";
import React, { useState } from "react";

const page = () => {
  const [data, setData] = useState({});
  console.log(data);
  return (
    <div>
      <Dropdown
        label="분류"
        id="category"
        name="category"
        onChange={(name, value) => { return setData((prev) => { return { ...prev, [name]: value }; }); }}
      />
    </div>
  );
};

export default page;
