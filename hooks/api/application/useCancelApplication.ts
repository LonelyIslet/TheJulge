import { useCancelApplicationMutation } from "redux/api/applicationApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/common/predicateErrorType";

const useCancelApplication = () => {
  const [sendRequest, { isLoading, isError }] = useCancelApplicationMutation();
  const { showErrorModal } = useErrorModal();

  const cancelApplication = async (
    shopId: string,
    noticeId: string,
    applicationId: string,
  ) => {
    try {
      const data = await sendRequest({ shopId, noticeId, applicationId }).unwrap();
      return data;
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        const errorObj = "error" in err ? err.error : err.data as { message: string };
        if (typeof errorObj !== "string") {
          showErrorModal(errorObj.message);
        }
      }
      console.error(err);
      return undefined;
    }
  };

  return { cancelApplication, isLoading, isError };
};

export default useCancelApplication;
