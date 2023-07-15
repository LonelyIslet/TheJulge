/* eslint-disable no-console */

"use client";

import { useState, useEffect } from "react";
import {
  CommonBtn, Modal, NotificationBoard, StatusChip,
} from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";
import { ButtonStyle } from "types/enums/button.enum";
import { ModalType } from "types/enums/modal.enum";
import { IAlert } from "types/dto";
import Popover from "components/common/Popover/Popover";
import useAppSelector from "redux/hooks/useAppSelector";
// import styles from "./page.module.scss";
import mockAlertData from "constants/mock/alerts.json";
import useToast from "hooks/useToast";

const ALERT_LIST: IAlert[] = mockAlertData.items.map((i) => {
  return i.item as IAlert;
});

const Page = () => {
  const user = useAppSelector((state) => { return state.user; });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(user);
    // console.log(process.env.NODE_ENV);
  }, [user]);

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
      {/* <div className={styles.formBackground}>
        <AuthForm />
      </div> */}
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
      {/* <div className={styles.formBackground}>
        <AuthForm />
      </div>
      <div className={styles.formBackground}>
        <AuthForm />
      </div> */}
    </main>
  );
};

export default Page;
