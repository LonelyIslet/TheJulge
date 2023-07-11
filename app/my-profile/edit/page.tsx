import { EditProfile } from "components/employee";
import Image from "next/image";
import React from "react";
import styles from "./page.module.scss";

const page = () => {
  return (
    <div className={styles.layout}>
      <header>
        <span>내 프로필</span>
        <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
      </header>
      <EditProfile />
    </div>
  );
};

export default page;
