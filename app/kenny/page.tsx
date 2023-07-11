"use client";

import { CommonBtn, StatusChip, Toast } from "components/common";
import Modal from "components/common/Modal/Modal";
import useToast from "hooks/useToast";
import { useState } from "react";
import { ApplyStatus } from "types/enums/apply.enum";
import { ButtonStyle } from "types/enums/button.enum";
import { ModalType } from "types/enums/modal.enum";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isToastShowing, showToast } = useToast();

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
        onClick={showToast}
        style={ButtonStyle.SOLID}
      />
      {isModalOpen
        && <Modal type={ModalType.ACTION} message="신청을 거절하시겠어요?" onClose={() => { setIsModalOpen(false); }} onClickProceed={() => { setIsModalOpen(false); }} />}
      {isToastShowing && <Toast message="거절 했어요." />}
    </main>
  );
};

export default Page;
