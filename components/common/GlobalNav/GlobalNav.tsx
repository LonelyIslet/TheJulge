"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useAppSelector from "redux/hooks/useAppSelector";
import SearchBar from "components/common/SearchBar/SearchBar";
import NotificationButton from "components/common/GlobalNav/NotificationButton";
import { UserType } from "types/enums/user.enum";
import useResponsiveHeader from "hooks/useResponsiveNavbar";
import styles from "./GlobalNav.module.scss";

const GlobalNav = () => {
  const user = useAppSelector((state) => { return state.user; });
  const router = useRouter();
  const navRef = useRef(null);
  useResponsiveHeader(navRef);

  const handleSignOut = () => {
    router.push("/signout");
  };

  return (
    <nav ref={navRef} className={styles.wrapper}>
      <div className={styles.container}>
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
          {!user.token ? (
            <>
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
            </>
          ) : (
            <>
              {user?.userInfo?.type === UserType.EMPLOYEE
                ? (
                  <Link href="/my-profile">
                    <h2>내 프로필</h2>
                  </Link>
                ) : (
                  <Link href="/my-shop">
                    <h2>내 가게</h2>
                  </Link>
                )}
              <button className={styles.logoutBtn} onClick={handleSignOut}>
                <h2>로그아웃</h2>
              </button>
              <NotificationButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default GlobalNav;
