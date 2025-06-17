import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// Enhanced base query to handle token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("ivan_authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  
  // Make the original request
  let result = await baseQuery(args, api, extraOptions);
  
  // Log the result to debug
  // console.log("In baseApi:API request result:", result);
  
  // If the access token is expired, handle token refresh
  const refreshToken = Cookies.get("ivan_refreshToken");

  if (result.error) {
    if (result.error.status === 401) {
      // Call the refresh token API
      const refreshResult = await baseQuery(
        {
          url: "/profile",
          method: "GET",
          // body: { refreshToken: refreshToken },
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }, // No body needed
        api,
        extraOptions
      );

      // console.log("Refresh token API result:", refreshResult);

      if (!refreshResult?.data) {
        localStorage.removeItem("ivan_authToken");
        Cookies.remove("ivan_refreshToken");
        toast.error("Access token has expired, Please login again.");
      }
    } else if (result.error.status === 400) {
      // Handle bad request errors
      console.error("Bad request error:", result.error);
    } else {
      // Handle unexpected errors
      console.error("Unexpected error:", result.error);
    }
  }

  return result;
};

// Create the API with the enhanced base query
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Banner", "AdminData"],
  endpoints: () => ({}),
});

// Export the image URL as a constant
export const imageUrl = `${import.meta.env.VITE_BASE_URL}`
