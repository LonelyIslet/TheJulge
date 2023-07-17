import useAppDispatch from "redux/hooks/useAppDispatch";
import { setShowModal, setErrorModalMessage } from "redux/slices/errorModalSlice";

const useErrorModal = () => {
  const dispatch = useAppDispatch();

  const showErrorModal = (message: string) => {
    dispatch(setErrorModalMessage(message));
    dispatch(setShowModal(true));
  };

  return { showErrorModal };
};

export default useErrorModal;
