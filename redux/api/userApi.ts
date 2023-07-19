import { apiSlice } from "redux/slices/apiSlice";
import { ILink, IUser } from "types/dto";
import { Address1 } from "types/shop/address";

interface IGetUserInfoResponse {
  item: IUser;
  links: ILink[];
}

type IUpdateUserInfoResponse = IGetUserInfoResponse;

export interface IUserUpdateInfo {
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
      // eslint-disable-next-line max-len
      updateUserInfo: builder.mutation<IUpdateUserInfoResponse, { userId: string, body: IUserUpdateInfo }>({
        query: ({ userId, body }) => {
          return {
            url: `users/${userId}`,
            method: "PUT",
            body,
          };
        },
      }),
    };
  },
});

export const { useGetUserInfoQuery, useUpdateUserInfoMutation } = userApi;
