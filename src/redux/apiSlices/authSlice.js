import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/verify-email",
          body: data,
        };
      },
    }),
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
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/forget-password",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/reset-password",
          body: data,
          headers: {
            Authorization: localStorage.getItem("Authorization"),
          },
        };
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

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PUT",
          url: "/update-profile",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("authToken")
            )}`,
          },
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

    profile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/get-profile",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      providesTags: ["AdminData"],

      transformResponse: ({ user }) => {
        return user;
      },
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
  useOtpVerifyMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useUpdateAdminProfileMutation,
  useFetchAdminProfileQuery,
} = authSlice;
