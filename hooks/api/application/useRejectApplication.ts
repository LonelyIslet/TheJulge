import { useRejectApplicationMutation } from "redux/api/applicationApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

const useRejectApplication = () => {
  const [sendRequest, { isLoading, isError }] = useRejectApplicationMutation();
  const { showErrorModal } = useErrorModal();

  const rejectApplication = async (
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
      return err;
    }
  };

  return { rejectApplication, isLoading, isError };
};

export default useRejectApplication;
