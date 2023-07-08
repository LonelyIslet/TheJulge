import Image from "next/image";
import { ModalType } from "types/enums/modal.enum";
import styles from "./Modal.module.scss";

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
}

const Modal = ({
  type, message, onClose, onClickProceed,
}: ModalProps) => {
  return (
    <>
      <div className={styles.overlay} />
      <div className={styles.container}>
        <div className={styles.modalHeader}>
          <div>
            <Image src={modalIconSrcMap[type]} alt="modal icon" fill />
          </div>
          <span>{message}</span>
        </div>
        <div className={styles.modalFooter}>
          <button type="button" className={styles.closeBtn} onClick={onClose}>아니오</button>
          {onClickProceed && <button type="button" className={styles.proceedBtn} onClick={onClickProceed}>거절하기</button>}
        </div>
      </div>
    </>
  );
};

export default Modal;
