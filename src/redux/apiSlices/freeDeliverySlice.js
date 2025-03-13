import { api } from "../api/baseApi";

const freeDeliverySlice = api.injectEndpoints({
  endpoints: (builder) => ({

    freeDeliveryAssign: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/single-free-delivery",
          body: data,
        };
      },
    }),
  }),
  
});

export const {
  useFreeDeliveryAssignMutation
} = freeDeliverySlice;
