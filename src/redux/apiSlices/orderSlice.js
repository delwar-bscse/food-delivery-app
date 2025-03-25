import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: ({status,page}) => {
        return {
          method: "GET",
          url: `/admin/parcel-status?status=${status}&page=${page}`,
        };
      },
    }),
  }),
});

export const { useOrdersQuery } = orderSlice;
