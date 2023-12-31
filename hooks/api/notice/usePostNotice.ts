import { IEditNotice, usePostNoticeMutation } from "redux/api/noticeApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/common/predicateErrorType";

const usePostNotice = () => {
  const [sendRequest, { isLoading, isError }] = usePostNoticeMutation();
  const { showErrorModal } = useErrorModal();

  const postNotice = async (
    shopId: string,
    body: IEditNotice,
  ) => {
    try {
      const data = await sendRequest({ shopId, body }).unwrap();
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

  return { postNotice, isLoading, isError };
};

export default usePostNotice;
