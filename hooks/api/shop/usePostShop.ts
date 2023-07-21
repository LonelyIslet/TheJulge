import { IShop } from "types/dto";
import { usePostShopMutation } from "redux/api/shopApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/common/predicateErrorType";

const usePostShop = () => {
  const [sendRequest, { isLoading, isError, isSuccess }] = usePostShopMutation();
  const { showErrorModal } = useErrorModal();

  const postShop = async (
    body: IShop,
  ) => {
    try {
      const data = await sendRequest(body).unwrap();
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

  return {
    postShop, isLoading, isError, isSuccess,
  };
};

export default usePostShop;
