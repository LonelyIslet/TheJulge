"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegisteredMyProfile, ApplicationDetails } from "components/employee";
import { withAuth, withUserType } from "components/hocs";
import { UserType } from "types/enums/user.enum";
import styles from "./page.module.scss";

const MyProfilePage = () => {
  return (
    <>
      <div className={styles.top}>
        <RegisteredMyProfile />
      </div>
      <div className={styles.bottom}>
        <ApplicationDetails />
      </div>
    </>
  );
};

export default withAuth(withUserType(MyProfilePage, UserType.EMPLOYEE));
