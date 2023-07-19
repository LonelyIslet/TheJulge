import { userApi } from "redux/api/userApi";

const useLazyGetUserInfo = () => {
  const [trigger, {
    isLoading: isUserInfoLoading, data: userInfoData, isSuccess: isUserInfoFetched,
  }] = userApi.endpoints.getUserInfo.useLazyQuery();

  const getUserInfo = async (userId: string) => {
    await trigger(userId);
  };

  return {
    getUserInfo, isUserInfoLoading, userInfoData, isUserInfoFetched,
  };
};

export default useLazyGetUserInfo;
