import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "components/common";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.leftItems}>
        <Link href="/">
          <div className={styles.logo}>
            <Image
              fill
              src="/images/logo.svg"
              alt="The Julge Logo"
              priority
            />
          </div>
        </Link>
      </div>
      <div className={styles.searchBar}>
        <SearchBar
          placeholder="가게 이름으로 찾아보세요"
        />
      </div>
      <div className={styles.rightItems}>
        <Link href="/signin">
          <h2>
            로그인
          </h2>
        </Link>
        <Link href="signup">
          <h2>
            회원가입
          </h2>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
