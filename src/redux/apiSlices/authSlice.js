import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/login",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),
    changePassword: builder.mutation({
      query: (value) => {
        return {
          method: "PUT",
          url: "/change-password",
          body: value,
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    updateAdminProfile: builder.mutation({
      query: ({formData, id}) => {
        return {
          method: "PUT",
          url: `/profile/${id}`,
          body: formData
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    fetchAdminProfile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/profile",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateAdminProfileMutation,
  useFetchAdminProfileQuery,
} = authSlice;
