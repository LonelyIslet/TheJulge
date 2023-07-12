"use client";

import { useState } from "react";
import { AuthForm } from "components/auth";
import { StatusChip, Modal, NotificationPopover } from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";
import { ModalType } from "types/enums/modal.enum";
import mockAlertData from "constants/mock/alerts.json";
import { IAlert } from "types/dto";
import styles from "./page.module.scss";

const ALERT_LIST: IAlert[] = mockAlertData.items.map((i: { item: IAlert[] }) => {
  return i.item;
});
const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <StatusChip status={ApplyStatus.PENDING} />
      <button type="button" onClick={() => { setIsModalOpen((prev) => { return !prev; }); }}>Open Modal</button>
      {isModalOpen
        && (
          <Modal
            type={ModalType.ACTION}
            message="신청을 거절하시겠어요?"
            onClose={() => { setIsModalOpen(false); }}
          />
        )}
      <div className={styles.formBackground}>
        <AuthForm />
      </div>
      <NotificationPopover alertList={ALERT_LIST} />
    </main>
  );
};

export default Page;
