import { ILink } from "types/dto";
import { apiSlice } from "redux/slices/apiSlice";

export interface IPostImageNameResponse {
  item: {
    url: string,
  },
  links: ILink[];
}

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      postImageName: builder.mutation<IPostImageNameResponse, { name: string }>({
        query: (body) => {
          return {
            url: "images",
            method: "POST",
            body,
          };
        },
      }),
    };
  },
});

export const { usePostImageNameMutation } = imageApi;
