import { apiSlice } from "redux/slices/apiSlice";
import { IAlert, ILink } from "types/dto";

interface IAlertResponse {
  item: IAlert;
  links: ILink[];
}

interface IGetAlertsResponse {
  offset: number;
  limit: number;
  items: IAlertResponse[];
  links: ILink[];
}

interface IPaginationParam {
  offset?: number;
  limit?: number;
}

export const alertApi = apiSlice.injectEndpoints({
  endpoints: (builder) => {
    return {
      getAlertsByUserId: builder.query<IGetAlertsResponse, {
        userId: string,
        params:
        IPaginationParam
      }>({
        query: ({ userId, params }) => {
          return {
            url: `/users/${userId}/alerts`,
            params,
          };
        },
      }),
      readAlert: builder.mutation<IGetAlertsResponse, { userId: string, alertId: string }>({
        query: ({ userId, alertId }) => {
          return {
            url: `/users/${userId}/alerts/${alertId}`,
            method: "PUT",
          };
        },
      }),
    };
  },
});

export const { useGetAlertsByUserIdQuery, useReadAlertMutation } = alertApi;
