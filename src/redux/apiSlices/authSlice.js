import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/login",
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
      query: (values) => {
        return {
          method: "PUT",
          url: "/admin/change-password",
          body: values,
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    updateAdminProfile: builder.mutation({
      query: ({formData, id}) => {
        return {
          method: "PUT",
          url: `/admin/profile/${id}`,
          body: formData
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    fetchAdminProfile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/profile",
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
