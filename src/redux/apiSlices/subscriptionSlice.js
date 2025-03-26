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
      query: ({id,data}) => {
        console.log("Update subscription : ", id, data);
        return {
          method: "PUT",
          url: `/admin/subscriptions/update-plan/${id}`,
          body: data,
        };
      },
    }),

    deleteSubscription: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/admin/subscriptions/delete/${id}`,
        };
      },
    }),
  }),
  
});

export const {
  useGlobalSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation
} = subscriptionSlice;
