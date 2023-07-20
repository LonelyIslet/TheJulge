import { INotice } from "types/dto";
import { usePostNoticeMutation } from "redux/api/noticeApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

interface IPostNotice {
  hourlyPay: number,
  startsAt: string,
  workhour: number,
  description: string,
}

const usePostNotice = () => {
  const [sendRequest, { isLoading, isError }] = usePostNoticeMutation();
  const { showErrorModal } = useErrorModal();

  const postNotice = async (
    shopId: string,
    body: IPostNotice,
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
