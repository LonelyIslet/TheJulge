"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useGetAlertsByUserIdQuery } from "redux/api/alertApi";
import Popover from "components/common/Popover/Popover";
import NotificationBoard from "components/common/NotificationBoard/NotificationBoard";
import { IAlert } from "types/dto";
import styles from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  userId: string;
}

const NotificationButton = ({ userId }: NotificationButtonProps) => {
  const [alertList, setAlertList] = useState<IAlert[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data, isSuccess } = useGetAlertsByUserIdQuery(
    { userId, params: { offset: 0, limit: 6 } },
    {
      pollingInterval: process.env.NODE_ENV === "production" ? 10000 : 3000,
    },
  );
  const [isInitialList, setIsInitialList] = useState(true);

  useEffect(() => {
    if (isSuccess) {
      setIsInitialList(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      setAlertList(
        data.items.filter((i) => { return !i.item.read; })
          .map((i) => { return i.item; }),
      );
    }
  }, [data]);

  const hasUnreadAlerts = (alerts: IAlert[]) => {
    return alerts.some((alert) => { return !alert.read; });
  };

  const handleReadAlert = (alertId: string) => {
    setAlertList((prev) => { return prev.filter((i) => { return i.id !== alertId; }); });
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
          alertList={alertList}
          isLoading={isInitialList}
          onClose={() => { setIsNotificationOpen(false); }}
          onRead={handleReadAlert}
        />
      </Popover>
      )}
    </div>
  );
};

export default NotificationButton;
