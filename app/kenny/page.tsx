"use client";

import { useState } from "react";
import { AuthForm } from "components/auth";
import { StatusChip, Modal, NotificationPopover } from "components/common";
import { ApplyStatus } from "types/enums/apply.enum";
import { ModalType } from "types/enums/modal.enum";
import styles from "./page.module.scss";

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
      <NotificationPopover />
    </main>
  );
};

export default Page;
