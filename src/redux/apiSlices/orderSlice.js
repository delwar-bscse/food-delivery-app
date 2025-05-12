import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: ({status,page,limit}) => {
        return {
          method: "GET",
          url: `/admin/parcel-status?status=${status}&page=${page}&limit=${limit}`,
        };
      },
    }),
    orderDetails: builder.query({
      query: (id) => {
        console.log(id);
        return {
          method: "GET",
          url: `/admin/parcel/${id}`,
        };
      },
    }),
  }),
});

export const { 
  useOrdersQuery,
  useOrderDetailsQuery 
} = orderSlice;
