import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "types/dto";
import { UserType } from "types/enums/user.enum";

interface ICredentials {
  email: string;
  password: string;
}

interface ICredentialsWithType extends ICredentials {
  type: UserType;
}

type Link = {
  rel: string,
  description: string,
  method: string,
  href: string,
};

interface SigninResponse {
  item: {
    token: string,
    user: {
      item: IUser,
      href: string
    }
  };
  links: Link[];
}

interface SignupResponse {
  item: {
    id: string,
    type: UserType,
    email: string,
  };
  links: Link[];
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/" }),
  endpoints: (builder) => {
    return {
      signin: builder.mutation<SigninResponse, ICredentials>({
        query: (body) => {
          return {
            url: "token",
            method: "POST",
            body,
          };
        },
      }),
      signup: builder.mutation<SignupResponse, ICredentialsWithType>({
        query: (body) => {
          return {
            url: "users",
            method: "POST",
            body,
          };
        },
      }),
    };
  },
});

export const { useSigninMutation, useSignupMutation } = authApi;
