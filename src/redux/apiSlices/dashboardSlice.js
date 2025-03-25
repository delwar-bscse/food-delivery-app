import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStates: builder.query({
      query: ({defaultPath,year,month}) => {
        return {
          method: "GET",
          url: `/admin/${defaultPath}?year=${year}&month=${month}`,
        };
      },
    }),
    generalTotalUsers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/admin/users'
        };
      },
    }),
    generalTotalRevenue: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/admin/totalRevenue/number',
        };
      },
    }),
    generalTotalSubscribers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/admin/totalSubscribers/total',
        };
      },
    }),
    generalTotalOrders: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/admin/totalOrders/number',
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