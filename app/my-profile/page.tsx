"use client";

import { RegisteredMyProfile, ApplicationDetails } from "components/employee";
import { withAuth, withUserType } from "components/hocs";
import { UserType } from "types/enums/user.enum";
import styles from "./page.module.scss";

export const metadata = {
  title: "내 프로필 | 더줄게",
};

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
