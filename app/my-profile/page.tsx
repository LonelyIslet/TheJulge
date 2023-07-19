/* eslint-disable @typescript-eslint/no-unused-vars */
import { RegisteredMyProfile, ApplicationDetails } from "components/employee";
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

export default MyProfilePage;
