"use client";

import {
  CommonBtn, StatusChip, Modal, NotificationBoard,
} from "components/common";
import useToast from "hooks/useToast";
import { useState } from "react";
import { AuthForm } from "components/auth";

import { ApplyStatus } from "types/enums/apply.enum";
import { ButtonStyle } from "types/enums/button.enum";
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
  const { showToast } = useToast();

  return (
    <main>
      <StatusChip status={ApplyStatus.PENDING} />
      <CommonBtn
        type="button"
        onClick={() => { setIsModalOpen((prev) => { return !prev; }); }}
        style={ButtonStyle.OUTLINE}
      >
        Open Modal
      </CommonBtn>
      <br />
      <CommonBtn
        type="button"
        onClick={() => { showToast("토스트 입니다."); }}
        style={ButtonStyle.SOLID}
      >
        Open Toast
      </CommonBtn>
      {isModalOpen
        && (
          <Modal
            type={ModalType.ACTION}
            message="신청을 거절하시겠어요?"
            onClose={() => { setIsModalOpen(false); }}
            onClickProceed={() => { showToast("거절 했습니다."); setIsModalOpen(false); }}
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
      <div className={styles.formBackground}>
        <AuthForm />
      </div>
      <div className={styles.formBackground}>
        <AuthForm />
      </div>
    </main>
  );
};

export default Page;
