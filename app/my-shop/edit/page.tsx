import Link from "next/link";
import Image from "next/image";
import FileUploader from "components/employer/FileUploater/FileUploader";
import styles from "./page.module.scss";

const MyShopEditPage = () => {
  const shopImageUrl = "https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/839938e7-9518-4d99-960e-1bcbf1b3b7ee.jpeg";
  return (
    <div className={styles.layout}>
      <header>
        <span>가게 정보</span>
        <Link href="/my-profile">
          <Image src="/images/close.svg" alt="닫기 버튼" width={30} height={30} />
        </Link>
      </header>
      <FileUploader />
      <FileUploader shopImageUrl={shopImageUrl} />
    </div>
  );
};

export default MyShopEditPage;
