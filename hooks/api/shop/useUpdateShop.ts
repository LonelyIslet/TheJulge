import { IShop } from "types/dto";
import { useUpdateShopInfoMutation } from "redux/api/shopApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/common/predicateErrorType";

const useUpdateShop = () => {
  const [sendRequest, { isLoading, isError, isSuccess }] = useUpdateShopInfoMutation();
  const { showErrorModal } = useErrorModal();

  const updateShop = async (
    shopId: string,
    body: IShop,
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

  return {
    updateShop, isLoading, isError, isSuccess,
  };
};

export default useUpdateShop;
