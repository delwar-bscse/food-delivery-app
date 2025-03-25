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
    orderDetails: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/admin/parcel-status/${id}`,
        };
      },
    }),
  }),
});

export const { 
  useOrdersQuery,
  useOrderDetailsQuery 
} = orderSlice;
