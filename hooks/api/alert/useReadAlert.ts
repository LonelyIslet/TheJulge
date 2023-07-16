/* eslint-disable consistent-return */
import { useReadAlertMutation } from "redux/api/alertApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

const useReadAlert = () => {
  const [sendRequest, { isLoading, isError }] = useReadAlertMutation();
  const { showErrorModal } = useErrorModal();

  const readAlert = async (
    userId: string,
    alertId: string,
  ) => {
    try {
      const data = await sendRequest({ userId, alertId }).unwrap();
      return data;
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errorObj = "error" in err ? err.error : err.data as { message: string };
        if (typeof errorObj !== "string") {
          showErrorModal(errorObj.message);
        }
      }
      console.error(err);
    }
  };

  return { readAlert, isLoading, isError };
};

export default useReadAlert;
