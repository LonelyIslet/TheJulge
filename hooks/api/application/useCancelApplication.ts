/* eslint-disable consistent-return */
import { useCancelApplicationMutation } from "redux/api/applicationApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

const useCancelApplication = () => {
  const [sendRequest, { isLoading, isError }] = useCancelApplicationMutation();
  const { showErrorModal } = useErrorModal();

  const cancelApplication = async (
    shopId: string,
    noticeId: string,
  ) => {
    try {
      const data = await sendRequest({ shopId, noticeId }).unwrap();
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

  return { cancelApplication, isLoading, isError };
};

export default useCancelApplication;
