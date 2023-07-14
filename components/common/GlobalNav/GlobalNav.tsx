"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "components/common";
import useResponsiveHeader from "hooks/useResponsiveNavbar";
import styles from "./GlobalNav.module.scss";

const GlobalNav = () => {
  const navRef = useRef(null);
  useResponsiveHeader(navRef);
  return (
    <nav ref={navRef} className={styles.container}>
      <div className={styles.contentContainer}>
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
          <Link href="/auth?mode=signin">
            <h2>
              로그인
            </h2>
          </Link>
          <Link href="/auth?mode=signup">
            <h2>
              회원가입
            </h2>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNav;
