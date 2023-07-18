import { apiSlice } from "redux/slices/apiSlice";
import { ILink, IShop } from "types/dto";

export interface IGetShopInfoResponse {
  item: IShop;
  links: ILink[];
}

type IPostShopResponse = IGetShopInfoResponse;
type IUpdateShopInfoResponse = IGetShopInfoResponse;

export const shopApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getShopInfo: builder.query<IGetShopInfoResponse, string>({
        query: (shopId) => { return `shops/${shopId}`; },
      }),
      postShop: builder.mutation<IPostShopResponse, IShop >({
        query: (body) => {
          return {
            url: "shops",
            method: "POST",
            body,
          };
        },
      }),
      updateShopInfo: builder.mutation<IUpdateShopInfoResponse, { shopId: string, body: IShop }>({
        query: ({ shopId, body }) => {
          return {
            url: `shops/${shopId}`,
            method: "PUT",
            body,
          };
        },
      }),
    };
  },
});

export const { useGetShopInfoQuery, usePostShopMutation, useUpdateShopInfoMutation } = shopApi;
