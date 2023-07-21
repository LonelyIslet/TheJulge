"use client";

import Image from "next/image";
import Link from "next/link";
import { EditProfile } from "components/employee";
import { withAuth, withUserType } from "components/hocs";
import { UserType } from "types/enums/user.enum";
import styles from "./page.module.scss";

export const metadata = {
  title: "내 프로필 수정 | 더줄게",
};

const MyProfilePage = () => {
  return (
    <div className={styles.layout}>
      <header>
        <span>내 프로필</span>
        <Link href="/my-profile">
          <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
        </Link>
      </header>
      <EditProfile />
    </div>
  );
};

export default withAuth(withUserType(MyProfilePage, UserType.EMPLOYEE));
