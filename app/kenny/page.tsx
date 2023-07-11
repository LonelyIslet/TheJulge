"use client";

import {
  CommonBtn, StatusChip, Modal,
} from "components/common";
import useToast from "hooks/useToast";
import { useState } from "react";
import { AuthForm } from "components/auth";
import { ApplyStatus } from "types/enums/apply.enum";
import { ButtonStyle } from "types/enums/button.enum";
import { ModalType } from "types/enums/modal.enum";
import styles from "./page.module.scss";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { showToast } = useToast();

  return (
    <main>
      <StatusChip status={ApplyStatus.PENDING} />
      <CommonBtn
        type="button"
        onClick={() => { setIsModalOpen((prev) => { return !prev; }); }}
        message="Open Modal"
        style={ButtonStyle.OUTLINE}
      />
      <br />
      <CommonBtn
        message="Open Toast"
        type="button"
        onClick={() => { showToast("토스트 입니다."); }}
        style={ButtonStyle.SOLID}
      />
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
      {/* {isToastShowing && <Toast message="거절 했어요." />} */}
    </main>
  );
};

export default Page;
