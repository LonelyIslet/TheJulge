import Image from "next/image";
import mockAlertData from "constants/mock/alerts.json";
import { useEffect, useState } from "react";
import { IAlert } from "types/dto";
import Popover from "../Popover/Popover";
import NotificationBoard from "../NotificationBoard/NotificationBoard";
// import { Popover, NotificationBoard } from "components/common";
import styles from "./NotificationButton.module.scss";

const ALERT_LIST: IAlert[] = mockAlertData.items.map((i) => {
  return i.item as IAlert;
});

const NotificationButton = () => {
  const [alertList, setAlertList] = useState<IAlert[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    // TOOD: api 호출을 통해 유저의 알림을 받아와 alertList에 setting한다.
    setAlertList(ALERT_LIST);
  }, []);

  const hasUnreadAlerts = (alerts: IAlert[]) => {
    return alerts.some((alert) => { return !alert.read; });
  };
  return (
    <div className={styles.notificationIcon}>
      <Image
        src={hasUnreadAlerts(alertList)
          ? "/images/notification-active.svg"
          : "/images/notification.svg"}
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
          onClose={() => { setIsNotificationOpen(false); }}
        />
      </Popover>
      )}
    </div>
  );
};

export default NotificationButton;
