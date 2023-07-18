import { apiSlice } from "redux/slices/apiSlice";
import { ILink, INotice } from "types/dto";
import { Address1 } from "types/shop/address";

interface INoticeResponse {
  item: INotice;
  links: ILink[];
}

type IPostNoticeResposne = INoticeResponse;
type IUpdateNoticeResponse = INoticeResponse;

interface IGetNoticeResponse {
  offset: number,
  limit: number,
  address: Address1[],
  items: {
    item: INotice,
    links: ILink[]
  }[];
  links: ILink[];
}

type SortOption = "pay" | "hour" | "shop";

interface INoticeQueryParam {
  offset?: number;
  limit?: number;
  address?: Address1[];
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: SortOption;
}

type IGetShopNoticeResponse = Omit<IGetNoticeResponse, "address">;

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getNotices: builder.query<IGetNoticeResponse, INoticeQueryParam >({
        query: (params) => {
          return {
            url: "notices",
            params,
          };
        },
      }),
      getNoticesByShopId: builder.query<IGetShopNoticeResponse, { shopId: string, params: Pick<INoticeQueryParam, "offset" | "limit"> }>({
        query: ({ shopId, params }) => {
          return {
            url: `notices/${shopId}`,
            params,
          };
        },
      }),
      postNotice: builder.mutation<IPostNoticeResposne, { shopId: number, body: INotice }>({
        query: ({ shopId, body }) => {
          return {
            url: `shops/${shopId}/notices`,
            method: "POST",
            body,
          };
        },
      }),
      getNoticeByShopAndNoticeId: builder.query<IGetNoticeResponse,
      {
        shopId: string,
        noticeId: string
      }>({
        query: ({ shopId, noticeId }) => { return `shops/${shopId}/notices/${noticeId}`; },
      }),
      updateNotice: builder.mutation<
      IUpdateNoticeResponse,
      {
        shopId: string,
        noticeId: string,
        body: INotice
      }>({
        query: ({ shopId, noticeId, body }) => {
          return {
            url: `shops/${shopId}/notices/${noticeId}`,
            body,
          };
        },
      }),
    };
  },
});

export const {
  useGetNoticesQuery,
  useGetNoticesByShopIdQuery,
  usePostNoticeMutation,
  useGetNoticeByShopAndNoticeIdQuery,
  useUpdateNoticeMutation,
} = noticeApi;
