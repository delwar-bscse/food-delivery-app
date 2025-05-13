import { use } from "react";
import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    newUserGrowth: builder.query({
      query: ({year,month}) => {
        return {
          method: "GET",
          url: `/admin/newUsers?year=${year}&month=${month}`,
        };
      },
    }),

    userAnalytics: builder.query({
      query: ({year,month,day}) => {
        return {
          method: "GET",
          url: `/admin/user-satistics?year=${year}&month=${month}&day={day}`,
        };
      },
    }),

    mostActiveUsers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/admin/user-satistics`,
        };
      },
    }),

    averageDeliveryTime: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/admin/order-details`,
        };
      },
    }),

    ratings: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/admin/star-rating`,
        };
      },
    }),

  }),
});

export const {
  useNewUserGrowthQuery,
  useUserAnalyticsQuery,
  useMostActiveUsersQuery,
  useAverageDeliveryTimeQuery,
  useRatingsQuery
} = userSlice;
