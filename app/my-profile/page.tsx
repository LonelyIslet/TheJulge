import { CommonLayout } from "components/common";
import RegisteredMyProfile from "components/employee/RegisteredMyProfile/RegisteredMyProfile";

const MyPage = () => {
  return (
    <>
      {/* <CommonDetail detailType={DetailType.EMPLOYER} /> */}
      {/* <CommonDetail detailType={DetailType.EMPLOYEE} /> */}
      <RegisteredMyProfile />
      <CommonLayout position="below">
        <div>
          <h2>신청내역</h2>
        </div>
        <div />
      </CommonLayout>
    </>
  );
};

export default MyPage;
