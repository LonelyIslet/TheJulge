"use client";

import useAppSelector from "redux/hooks/useAppSelector";
import useAppDispatch from "redux/hooks/useAppDispatch";
import { setShowModal } from "redux/slices/errorModalSlice";
import { ModalType } from "types/enums/modal.enum";
import Modal from "./Modal";

const ErrorModalRoot = () => {
  const isVisible = useAppSelector((state) => { return state.errorModal.isShowing; });
  const message = useAppSelector((state) => { return state.errorModal.message; });
  const dispatch = useAppDispatch();
  if (isVisible) {
    return (
      <Modal
        type={ModalType.CONFIRM}
        message={message}
        onClose={() => { dispatch(setShowModal(false)); }}
      />
    );
  }
  return null;
};

export default ErrorModalRoot;
