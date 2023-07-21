"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import { Modal } from "components/common";
import { ModalType } from "types/enums/modal.enum";
import useAcceptApplication from "hooks/api/application/useAcceptApplication";
import useRejectApplication from "hooks/api/application/useRejectApplication";
import { useParams } from "next/navigation";
import styles from "./CheckStatusButton.module.scss";

const CheckStatusButton = ({ userId }: { userId: string }) => {
  const params = useParams();
  const [isApproveModal, setApproveIsModal] = useState(false);
  const [isRejectModal, setIsRejectModal] = useState<boolean>(false);
  const { acceptApplication } = useAcceptApplication();
  const { rejectApplication } = useRejectApplication();

  const handleApproveModal = () => {
    setApproveIsModal(!isApproveModal);
  };

  const handleRejectModal = () => {
    setIsRejectModal(!isRejectModal);
  };

  const handleApproveApplication = async () => {
    const response = await acceptApplication(params.shopId, params.noticeId, userId);
  };

  const handleRejectApplication = async () => {
    const response = await rejectApplication(params.shopId, params.noticeId, userId);
  };

  return (
    <div className={styles.container}>
      <button type="button" className={styles.approve} onClick={handleApproveModal}>승인하기</button>
      <button type="button" className={styles.reject} onClick={handleRejectModal}>거절하기</button>
      {isApproveModal && !isRejectModal && (
      <Modal
        type={ModalType.ACTION}
        message="신청을 승인하시겠어요?"
        closeBtnLabel="아니오"
        proceedBtnLabel="승인하기"
        onClose={() => { return setApproveIsModal(false); }}
        onClickProceed={handleApproveApplication}
      />
      )}
      {!isApproveModal && isRejectModal && (
      <Modal
        type={ModalType.ACTION}
        message="신청을 거절하시겠어요?"
        closeBtnLabel="아니오"
        proceedBtnLabel="거절하기"
        onClose={() => { return setIsRejectModal(false); }}
        onClickProceed={handleRejectApplication}
      />
      )}
    </div>
  );
};

export default CheckStatusButton;
