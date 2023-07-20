import { ILink, INotice } from "types/dto";
import { Address1 } from "types/shop/address";
import { apiSlice } from "redux/slices/apiSlice";

export interface IEditNotice {
  hourlyPay: number,
  startsAt: string,
  workhour: number,
  description: string
}
interface INoticeResponse {
  item: INotice;
  links: ILink[];
}

type IPostNoticeResposne = INoticeResponse;
type IUpdateNoticeResponse = INoticeResponse;

export interface IGetNoticeResponse {
  offset: number,
  limit: number,
  address: Address1[],
  items: {
    item: INotice,
    links: ILink[]
  }[];
  links: ILink[];
}

export type SortOption = "pay" | "hour" | "shop";

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
          const createSearchParams = (paramObj: INoticeQueryParam) => {
            return new URLSearchParams(Object.entries(paramObj).flatMap(([key, values]) => {
              return (Array.isArray(values) ? values.map((value) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return [key, value];
              }) : [[key, values]]);
            }));
          };
          return {
            url: "notices",
            params: createSearchParams(params),
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
      postNotice: builder.mutation<IPostNoticeResposne, { shopId: string, body: IEditNotice }>({
        query: ({ shopId, body }) => {
          return {
            url: `shops/${shopId}/notices`,
            method: "POST",
            body,
          };
        },
      }),
      getNoticeByShopAndNoticeId: builder.query<INoticeResponse,
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
        body: IEditNotice
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
