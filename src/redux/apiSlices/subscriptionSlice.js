import { api } from "../api/baseApi";

const subscriptionSlice = api.injectEndpoints({
  endpoints: (builder) => ({

    globalSubscription: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/subscriptions/globalsubscription",
        };
      },
      providesTags: ["AdminData"]
    }),

    updateSubscription: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/subscriptions/update-price",
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
