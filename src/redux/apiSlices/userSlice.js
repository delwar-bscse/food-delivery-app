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
          url: '/users'
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
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),
    userDeleteById: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/user/${id}`,
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
  useUserByIdQuery,
  useUserDeleteByIdMutation
} = userSlice;
