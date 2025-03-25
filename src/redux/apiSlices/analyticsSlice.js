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
  }),
});

export const {
  useNewUserGrowthQuery,
} = userSlice;
