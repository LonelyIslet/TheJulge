import { useEffect } from "react";
import useAppDispatch from "redux/hooks/useAppDispatch";
import useAppSelector from "redux/hooks/useAppSelector";
import { setShow, setToastMessage } from "redux/slices/toastSlice";

const useToast = () => {
  const isShowing = useAppSelector((state) => { return state.toast.isShowing; });
  const dispatch = useAppDispatch();

  const showToast = (message: string) => {
    dispatch(setToastMessage(message));
    dispatch(setShow(true));
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isShowing) {
      timer = setTimeout(() => {
        dispatch(setShow(false));
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, isShowing]);

  return { showToast };
};

export default useToast;
