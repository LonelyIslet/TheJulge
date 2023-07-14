import Image from "next/image";
import { ModalType } from "types/enums/modal.enum";
import styles from "./Modal.module.scss";
import ModalPortal from "./ModalPortal";

const modalIconSrcMap = {
  [ModalType.ACTION]: "/images/modal-check.svg",
  [ModalType.CONFIRM]: "/images/modal-error.svg",
};

type ProceedHandler = (e: React.MouseEvent) => void;
type CloseHandler = (e: React.MouseEvent) => void;

interface ModalProps {
  type: ModalType;
  message: string;
  onClose: CloseHandler;
  onClickProceed?: ProceedHandler;
  closeBtnLabel?: string;
  proceedBtnLabel?:string;
}

const Modal = ({
  type, message, onClose, onClickProceed, closeBtnLabel, proceedBtnLabel,
}: ModalProps) => {
  return (
    <ModalPortal>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <div>
            <Image src={modalIconSrcMap[type]} alt="modal icon" fill />
          </div>
          <span>{message}</span>
        </div>
        <div className={styles.modalFooter}>
          <button type="button" className={styles.closeBtn} onClick={onClose}>{closeBtnLabel ?? "닫기"}</button>
          {onClickProceed && (
            <button
              type="button"
              className={styles.proceedBtn}
              onClick={onClickProceed}
            >
              {proceedBtnLabel ?? "진행하기"}
            </button>
          )}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
