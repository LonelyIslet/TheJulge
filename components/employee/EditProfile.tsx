"use client";

import { CustomInput, Dropdown } from "components/common";
import { useState } from "react";

const EditProfile = () => {
  const [data, setData] = useState();

  return (
    <div>
      <CustomInput element="text" type="text" label="이름" placeholder="입력" id="name" name="이름" essential />
      <CustomInput element="text" type="text" label="연락처" placeholder="입력" id="phone" name="phone" essential />
      <Dropdown category="location" label="선호 지역" id="address" name="address" />
      <CustomInput element="textarea" label="소개" placeholder="입력" id="bio" name="bio" />
    </div>
  );
};

export default EditProfile;
