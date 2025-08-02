import { api } from "../api/baseApi";

const notificationSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    notification: builder.query({
      query: () => {
        return {
          url: `/admin/notification`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    reviews: builder.query({
      query: ({page=1,limit=10}) => {
        return {
          url: `/review/?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),
    deleteReview: builder.mutation({
      query: (id) => {
        return {
          url: `/review/${id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const { useNotificationQuery, useReadMutation, useReviewsQuery, useDeleteReviewMutation } = notificationSlice;
