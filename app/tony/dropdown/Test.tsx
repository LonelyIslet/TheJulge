"use client";

import { useState } from "react";
import Dropdown from "components/common/Dropdown/Dropdown";

const Test = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState({});
  return (
    <div>
      <Dropdown
        label="분류"
        id="category"
        name="category"
        onChange={(name, value) => {
          return setData((prev) => { return { ...prev, [name]: value }; });
        }}
      />
    </div>
  );
};

export default Test;
