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
  useUpdateStatusMutation,
  useVendorsQuery,
  useUserByIdQuery,
} = userSlice;
