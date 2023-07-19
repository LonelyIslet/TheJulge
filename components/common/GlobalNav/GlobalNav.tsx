"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SearchBar from "components/common/SearchBar/SearchBar";
import Popover from "components/common/Popover/Popover";
import NotificationBoard from "components/common/NotificationBoard/NotificationBoard";
import { IAlert } from "types/dto";
import { UserType } from "types/enums/user.enum";
import mockAlertData from "constants/mock/alerts.json";
import useAppSelector from "redux/hooks/useAppSelector";
import useResponsiveHeader from "hooks/useResponsiveNavbar";
import styles from "./GlobalNav.module.scss";

const ALERT_LIST: IAlert[] = mockAlertData.items.map((i) => {
  return i.item as IAlert;
});

const GlobalNav = () => {
  const user = useAppSelector((state) => { return state.user; });
  const router = useRouter();
  const [alertList, setAlertList] = useState<IAlert[]>([]);
  const navRef = useRef(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  useResponsiveHeader(navRef);

  useEffect(() => {
    // TOOD: api 호출을 통해 유저의 알림을 받아와 alertList에 setting한다.
    setAlertList(ALERT_LIST);
  }, []);

  const hasUnreadAlerts = (alerts: IAlert[]) => {
    return alerts.some((alert) => { return !alert.read; });
  };

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
              <div className={styles.notificationIcon}>
                <Image
                  src={
                    hasUnreadAlerts(alertList)
                      ? "/images/notification-active.svg"
                      : "/images/notification.svg"
                  }
                  fill
                  alt="알림 아이콘"
                  onClick={() => {
                    setIsNotificationOpen((prev) => { return !prev; });
                  }}
                />
                {isNotificationOpen && (
                <Popover
                  onClose={() => { setIsNotificationOpen(false); }}
                  top="2.85rem"
                  right="0rem"
                >
                  <NotificationBoard
                    alertList={ALERT_LIST}
                    onClose={() => {
                      setIsNotificationOpen(false);
                    }}
                  />
                </Popover>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default GlobalNav;
