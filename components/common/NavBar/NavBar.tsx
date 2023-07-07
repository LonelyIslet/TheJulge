import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "components/common";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav>
      <Link href="/">
        <div className={styles.logo}>
          <Image
            fill
            src="/images/logo.svg"
            alt="The Julge Logo"
          />
        </div>
      </Link>
      <SearchBar />
      <div className={styles.third} />
    </nav>
  );
};

export default NavBar;
