import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    users: builder.query({
      query: ({page,filterType}) => {
        return {
          method: "GET",
          url: `/users?page=${page}&filterType=${filterType}`,
        };
      },
    }),
    totalUsers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/totalUsers?year=2025&month=02`,
        };
      },
    }),
    updateStatus: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/users/hold",
          body: data
        };
      },
    }),
    vendors: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=VENDOR",
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useTotalUsersQuery,
  useUpdateStatusMutation,
  useVendorsQuery,
  useUserByIdQuery,
} = userSlice;
