import { apiSlice } from "redux/slices/apiSlice";
import { IUserState } from "redux/slices/userSlice";
import { ILink, IUser } from "types/dto";
import { Address1 } from "types/shop/address";

interface IGetUserInfoResponse {
  item: IUser;
  links: ILink[];
}

type IUpdateUserInfoResponse = IGetUserInfoResponse;

interface IUserUpdateInfo {
  name: string;
  phone: string;
  address: Address1;
  bio: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getUserInfo: builder.query<IGetUserInfoResponse, string>({
        query: (userId) => {
          return `users/${userId}`;
        },
      }),
      updateUserInfo: builder.mutation<IUpdateUserInfoResponse,
      {
        user: IUserState,
        body: IUserUpdateInfo
      }>({
        query: ({ user, body }) => {
          const { token, userInfo } = user;
          return {
            url: `users/${userInfo?.id as string}`,
            method: "PUT",
            headers: { authorization: `Bearer ${token as string}` },
            body,
          };
        },
      }),
    };
  },
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = userApi;
