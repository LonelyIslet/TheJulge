"use client";

import Image from "next/image";
import Link from "next/link";
import { CommonDetail, CommonBtn } from "components/common";
import { ButtonStyle } from "types/enums/button.enum";
import { DetailType } from "types/enums/detailPage.enum";
import useAppSelector from "redux/hooks/useAppSelector";
import styles from "./RegisteredMyProfile.module.scss";

const RegisteredMyProfile = () => {
  const userData = useAppSelector((state) => { return state.user; });
  const { userInfo } = userData;

  if (userInfo && !userInfo.name) {
    return <CommonDetail detailType={DetailType.EMPLOYEE} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.blank}>
        <h2>내 프로필</h2>
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfoDetail}>
          <p>이름</p>
          <h2>{userInfo?.name}</h2>
          <div className={styles.phone}>
            <Image src="/images/phone.svg" alt="전화번호" width={16} height={20} />
            <span>{userInfo?.phone}</span>
          </div>
          <div className={styles.address}>
            <Image src="/images/location-red.svg" alt="주소" width={16} height={20} />
            <span>
              {`선호 지역: ${userInfo?.address as string}`}
            </span>
          </div>
          <p>
            {userInfo?.bio}
          </p>
        </div>
        <div className={styles.wrapperButton}>
          <Link href="/my-profile/edit">
            <CommonBtn type="button" style={ButtonStyle.OUTLINE}>편집하기</CommonBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisteredMyProfile;
