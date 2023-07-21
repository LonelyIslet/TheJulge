import { IApplication, ILink } from "types/dto";
import { ApplyStatus } from "types/enums/apply.enum";
import { apiSlice } from "redux/slices/apiSlice";

interface IApplicationResponse {
  item: IApplication;
  links: ILink[];
}

interface IPaginationParam {
  offset?: number;
  limit?: number;
}

interface IGetApplicationsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: IApplicationResponse[];
  links: ILink[];
}

type IPostApplicationResponse = IApplicationResponse;
type IUpdateApplicationResponse = IApplicationResponse;

export const applicationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getApplicationsByShopAndNoticeId: builder.query<IGetApplicationsResponse, {
        shopId: string,
        noticeId: string,
        params: IPaginationParam,
      }>({
        query: ({ shopId, noticeId, params }) => {
          return {
            url: `shops/${shopId}/notices/${noticeId}/applications`,
            params,
          };
        },
      }),
      postApplication: builder.mutation<IPostApplicationResponse, {
        shopId: string,
        noticeId: string,
      }>({
        query: ({ shopId, noticeId }) => {
          return {
            url: `shops/${shopId}/notices/${noticeId}/applications`,
            method: "POST",
          };
        },
      }),
      acceptApplication: builder.mutation<IUpdateApplicationResponse, {
        shopId: string,
        noticeId: string,
        applicationId: string,
      }>({
        query: ({ shopId, noticeId, applicationId }) => {
          return {
            url: `shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
            method: "PUT",
            body: { status: ApplyStatus.ACCEPTED },
          };
        },
      }),
      rejectApplication: builder.mutation<IUpdateApplicationResponse, {
        shopId: string,
        noticeId: string,
        applicationId: string,
      }>({
        query: ({ shopId, noticeId, applicationId }) => {
          return {
            url: `shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
            method: "PUT",
            body: { status: ApplyStatus.REJECTED },
          };
        },
      }),
      cancelApplication: builder.mutation<IUpdateApplicationResponse, {
        shopId: string,
        noticeId: string,
        applicationId: string,
      }>({
        query: ({ shopId, noticeId, applicationId }) => {
          return {
            url: `shops/${shopId}/notices/${noticeId}/applications/${applicationId}`,
            method: "PUT",
            body: { status: ApplyStatus.CANCELED },
          };
        },
      }),
      getApplicationsByUserId: builder.query<IGetApplicationsResponse, {
        userId: string,
        params: IPaginationParam,
      }>({
        query: ({ userId, params }) => {
          return {
            url: `users/${userId}/applications`,
            params,
          };
        },
      }),
    };
  },
});

export const {
  useGetApplicationsByShopAndNoticeIdQuery,
  usePostApplicationMutation,
  useAcceptApplicationMutation,
  useRejectApplicationMutation,
  useCancelApplicationMutation,
  useGetApplicationsByUserIdQuery,
} = applicationApi;
