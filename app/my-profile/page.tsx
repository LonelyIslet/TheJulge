/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonDetail, CommonLayout, StatusChip } from "components/common";
import { RegisteredMyProfile, ApplicationDetails } from "components/employee";
import { EmployeeTable } from "components/notice";
import RegisteredMyProfile from "components/employee/RegisteredMyProfile/RegisteredMyProfile";
import { DetailType } from "types/enums/detailPage.enum";
import styles from "./page.module.scss";

const MyProfilePage = () => {
  return (
    <>
      <div className={styles.top}>
        <CommonDetail detailType={DetailType.EMPLOYEE} />
        {/* <RegisteredMyProfile name="곽철용" phone="010-1234-1234" address="서울시 마포구" /> */}
      </div>
      <div className={styles.bottom}>
        {/* <CommonDetail detailType={DetailType.APPLICATION_DETAILS} /> */}
        <ApplicationDetails />
      </div>
    </>
  );
};

export default MyProfilePage;
