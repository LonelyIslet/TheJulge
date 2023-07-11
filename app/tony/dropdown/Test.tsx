"use client";

import { useState } from "react";
import Dropdown from "components/common/Dropdown/Dropdown";

const Test = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({});

  return (
    <div>
      <Dropdown
        category="shop"
        label="가게분류"
        id="category"
        name="category"
        onChange={(name, value) => {
          return setData((prev) => { return { ...prev, [name]: value }; });
        }}
      />
      <Dropdown
        category="location"
        label="장소"
        id="location"
        name="location"
        onChange={(name, value) => {
          return setData((prev) => { return { ...prev, [name]: value }; });
        }}
      />
    </div>
  );
};

export default Test;
