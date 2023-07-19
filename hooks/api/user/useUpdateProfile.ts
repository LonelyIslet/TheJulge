import { IUserUpdateInfo, useUpdateUserInfoMutation } from "redux/api/userApi";
import useErrorModal from "hooks/useErrorModal";
import { isFetchBaseQueryError } from "utils/predicateErrorType";

const useUpdateProfile = () => {
  const [sendRequest, { isLoading, isError }] = useUpdateUserInfoMutation();
  const { showErrorModal } = useErrorModal();

  const updateProfile = async (
    userId: string,
    body: IUserUpdateInfo,
  ) => {
    try {
      const data = await sendRequest({ userId, body }).unwrap();
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

  return { updateProfile, isLoading, isError };
};

export default useUpdateProfile;
