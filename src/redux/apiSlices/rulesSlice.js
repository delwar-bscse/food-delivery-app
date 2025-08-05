import { api } from "../api/baseApi";

const rulesSlice = api.injectEndpoints({
  endpoints: (builder) => ({

    // terms and conditions
    updateTermsAndConditions: builder.mutation({
      query: (data) => {
        return {
          url: `/rule/terms-and-conditions`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    termsAndCondition: builder.query({
      query: () => {
        return {
          url: `/rule/terms-and-conditions`,
          method: "GET",
        };
      }
    }),

    // privacy policy
    updatePrivacyPolicy: builder.mutation({
      query: (data) => {
        return {
          url: `/rule/privacy-policy`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    PrivacyPolicy: builder.query({
      query: () => {
        return {
          url: `/rule/privacy-policy`,
          method: "GET",
        };
      }
    }),

    // About Us
    updateAboutUs: builder.mutation({
      query: (data) => {
        return {
          url: `/rule/privacy-policy`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    AboutUs: builder.query({
      query: () => {
        return {
          url: `/rule/privacy-policy`,
          method: "GET",
        };
      }
    }),

  }),
});

export const {
  useUpdateTermsAndConditionsMutation,
  useTermsAndConditionQuery,

  useUpdatePrivacyPolicyMutation,
  usePrivacyPolicyQuery,

  useUpdateAboutUsMutation,
  useAboutUsQuery
} = rulesSlice;
