"use client";

import CommonDetail from "components/common/CommonDetail/CommonDetail";
import { DetailType } from "types/enums/detailPage.enum";

const page = () => {
  return (
    <div>
      {/* <CommonDetail detailType={DetailType.EMPLOYER} /> */}
      <CommonDetail detailType={DetailType.EMPLOYEE} />
    </div>
  );
};

export default page;
