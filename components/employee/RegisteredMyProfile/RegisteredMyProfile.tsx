import Image from "next/image";
import Link from "next/link";
import { CommonBtn } from "components/common";
import { ButtonStyle } from "types/enums/button.enum";
import styles from "./RegisteredMyProfile.module.scss";

interface RegisteredMyProfileProps {
  name: string
  phone: string
  address: string
}

const RegisteredMyProfile = ({ name, phone, address }: RegisteredMyProfileProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.blank}>
        <h2>내 프로필</h2>
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfoDetail}>
          <p>이름</p>
          <h2>{name}</h2>
          <div className={styles.phone}>
            <Image src="/images/phone.svg" alt="전화번호" width={16} height={20} />
            <span>{phone}</span>
          </div>
          <div className={styles.address}>
            <Image src="/images/location-red.svg" alt="주소" width={16} height={20} />
            <span>{`선호 지역: ${address}`}</span>
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
