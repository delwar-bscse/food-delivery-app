import { api } from "../api/baseApi";

const announcementSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewAnnouncment: builder.mutation({
      query: (data) => {
        return {
          url: '/admin/announcement',
          method: "POST",
          body: data,
        };
      },
    }),
    getAllAnnouncment: builder.query({
      query: () => {
        return {
          url: '/admin/announcements',
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { 
  useCreateNewAnnouncmentMutation,
  useLazyGetAllAnnouncmentQuery,
  useGetAllAnnouncmentQuery
 } =
  announcementSlice;
