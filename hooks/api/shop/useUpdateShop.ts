/* eslint-disable consistent-return */
import { useUpdateShopInfoMutation } from "redux/api/shopApi";
import { IShop } from "types/dto";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

const useUpdateShop = () => {
  const [sendRequest, { isLoading, isError }] = useUpdateShopInfoMutation();
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
    }
  };

  return { updateShop, isLoading, isError };
};

export default useUpdateShop;
