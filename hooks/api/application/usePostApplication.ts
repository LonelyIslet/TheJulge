import { usePostApplicationMutation } from "redux/api/applicationApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/common/predicateErrorType";

const usePostApplication = () => {
  const [sendRequest, { isLoading, isError }] = usePostApplicationMutation();
  const { showErrorModal } = useErrorModal();

  const postApplication = async (
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
      return undefined;
    }
  };

  return { postApplication, isLoading, isError };
};

export default usePostApplication;
