import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStates: builder.query({
      query: ({defaultPath,year,month}) => {
        return {
          method: "GET",
          url: `/${defaultPath}?year=${year}&month=${month}`,
        };
      },
    }),
    generalTotalUsers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/users'
        };
      },
    }),
    generalTotalRevenue: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/totalRevenue/number',
        };
      },
    }),
    generalTotalSubscribers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/totalSubscribers/total',
        };
      },
    }),
    generalTotalOrders: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/totalOrders/number',
        };
      },
    }),
  }),
});

export const {
  useGeneralStatesQuery,
  useGeneralTotalUsersQuery,
  useGeneralTotalRevenueQuery,
  useGeneralTotalSubscribersQuery,
  useGeneralTotalOrdersQuery
} = dashboardSlice;