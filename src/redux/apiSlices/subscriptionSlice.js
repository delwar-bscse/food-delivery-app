import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
  endpoints: (builder) => ({

    globalSubscription: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/subscriptions/globalsubscription",
        };
      },
      providesTags: ["AdminData"]
    }),

    updateSubscription: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/admin/subscriptions/update-price",
          body: data,
        };
      },
    }),
  }),
  
});

export const {
  useUpdateSubscriptionMutation,
  useGlobalSubscriptionQuery,
} = subscriptionSlice;
