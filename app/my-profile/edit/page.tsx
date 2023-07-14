import Link from "next/link";
import Image from "next/image";
import { EditProfile } from "components/employee";
import styles from "./page.module.scss";

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

export default MyProfilePage;
