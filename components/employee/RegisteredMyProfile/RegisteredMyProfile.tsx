import { CommonBtn } from "components/common";
import Image from "next/image";
import Link from "next/link";
import { ButtonStyle } from "types/enums/button.enum";
import styles from "./RegisteredMyProfile.module.scss";

const RegisteredMyProfile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.blank}>
        <h2>내 프로필</h2>
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfoDetail}>
          <p>이름</p>
          <h2>김승우</h2>
          <div className={styles.phone}>
            <Image src="/images/phone.svg" alt="전화번호" width={16} height={20} />
            <span>010-1234-4223</span>
          </div>
          <div className={styles.address}>
            <Image src="/images/location-red.svg" alt="주소" width={16} height={20} />
            <span>선호 지역: 서울시 도봉구</span>
          </div>
          <p>
            열심히 일하겠습니다.
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
