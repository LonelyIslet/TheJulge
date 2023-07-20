import { INotice } from "types/dto";
import { useUpdateNoticeMutation } from "redux/api/noticeApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/common/predicateErrorType";

const useUpdateNotice = () => {
  const [sendRequest, { isLoading, isError }] = useUpdateNoticeMutation();
  const { showErrorModal } = useErrorModal();

  const updateNotice = async (
    shopId: string,
    noticeId: string,
    body: INotice,
  ) => {
    try {
      const data = await sendRequest({ shopId, noticeId, body }).unwrap();
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

  return { updateNotice, isLoading, isError };
};

export default useUpdateNotice;
