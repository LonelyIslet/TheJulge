import Link from "next/link";
import Image from "next/image";
import { EditNoticeForm } from "components/employer";
import styles from "./page.module.scss";

const NoticeWrite = () => {
  return (
    <>
      <div className={styles.header}>
        <span>공고 등록</span>
        <Link href="/my-profile">
          <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
        </Link>
      </div>
      <EditNoticeForm />
    </>
  );
};

export default NoticeWrite;