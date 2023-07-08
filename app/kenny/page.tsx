"use client";

import { StatusChip } from "components/common";
import Modal from "components/common/Modal/Modal";
import { useState } from "react";
import { ApplyStatus } from "types/enums/apply.enum";
import { ModalType } from "types/enums/modal.enum";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <StatusChip status={ApplyStatus.PENDING} />
      <button type="button" onClick={() => { setIsModalOpen((prev) => { return !prev; }); }}>Open Modal</button>
      {isModalOpen
        && <Modal type={ModalType.ACTION} message="신청을 거절하시겠어요?" onClose={() => { setIsModalOpen(false); }} onClickProceed={() => { setIsModalOpen(false); }} />}
    </main>
  );
};

export default Page;
