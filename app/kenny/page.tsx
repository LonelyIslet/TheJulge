"use client";

import { useState } from "react";
import { AuthForm } from "components/auth";
import { StatusChip, Modal, NotificationBoard } from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";
import { ModalType } from "types/enums/modal.enum";
import mockAlertData from "constants/mock/alerts.json";
import { IAlert } from "types/dto";
import Popover from "components/common/Popover/Popover";
import styles from "./page.module.scss";

const ALERT_LIST: IAlert[] = mockAlertData.items.map((i) => {
  return i.item as IAlert;
});

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

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

      <div style={{ position: "relative" }}>
        <button type="button" onClick={() => { setIsPopoverOpen((prev) => { return !prev; }); }}>Open Popover</button>
        {isPopoverOpen && (
          <Popover onClose={() => { setIsPopoverOpen(false); }} bottom="8rem">
            <NotificationBoard
              alertList={ALERT_LIST}
              onClose={() => { setIsPopoverOpen(false); }}
            />
          </Popover>
        )}
      </div>
    </main>
  );
};

export default Page;
