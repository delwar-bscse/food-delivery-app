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

    createSubscription: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/subscriptions/createsubscription",
          body: data,
        };
      },
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
  useCreateSubscriptionMutation,
  useGlobalSubscriptionQuery,
} = subscriptionSlice;
