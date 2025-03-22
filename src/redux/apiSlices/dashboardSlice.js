import { api } from "../api/baseApi";

const dashboardSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    generalStates: builder.query({
      query: ({defaultPath,year,month}) => {
        console.log(defaultPath,year,month);
        return {
          method: "GET",
          url: "/totalUsers?year=2025&month=07",
          // url: `/${defaultPath}??year=${year}&month=${month}`,
        };
      },
    }),
  }),
});

export const {
  useGeneralStatesQuery
} = dashboardSlice;
