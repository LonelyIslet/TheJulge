import { usePostImageNameMutation } from "redux/api/imageApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

const usePostImageName = () => {
  const [sendRequest, { isLoading, isError }] = usePostImageNameMutation();
  const { showErrorModal } = useErrorModal();

  const postImageName = async (
    body: { name: string },
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

  return { postImageName, isLoading, isError };
};

export default usePostImageName;
