"use client";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { useState } from "react";
import { Dropdown } from "components/common";

const TonyPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, react-hooks/rules-of-hooks
  const [data, setData] = useState({});
  const handleData = (event:
  React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> |
  React.MouseEvent<HTMLButtonElement>) => {
    setData((prev) => {
      return {
        ...prev,
        [(event.target as HTMLInputElement)?.name]: (event.target as HTMLInputElement)?.value,
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

export default TonyPage;
