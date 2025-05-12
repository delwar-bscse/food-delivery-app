import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/admin/user?role=ADMIN",
        };
      },
    }),
    users: builder.query({
      query: ({page,limit,filterType,sortOrder,sortBy}) => {
        return {
          method: "GET",
          url: `/admin/users?page=${page}limit=${limit}&filterType=${filterType}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
        };
      },
    }),
    totalUsers: builder.query({
      query: () => {
        return {
          method: "GET",
          url: '/admin/users'
        };
      },
    }),
    updateStatus: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/admin/users/hold",
          body: data
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/activity/all/${id}`,
        };
      },
    }),
    userDeleteById: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/admin/user/${id}`,
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
