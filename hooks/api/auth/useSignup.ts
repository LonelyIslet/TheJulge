/* eslint-disable consistent-return */
import { ICredentialsWithType, useSigninMutation } from "redux/api/authApi";
import { isFetchBaseQueryError } from "utils/predicateErrorType";
import useErrorModal from "hooks/useErrorModal";

const useSignup = () => {
  const [sendRequest, { isLoading, isError }] = useSigninMutation();
  const { showErrorModal } = useErrorModal();

  const signup = async (
    body: ICredentialsWithType,
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
    }
  };

  return { signup, isLoading, isError };
};

export default useSignup;
