import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

// Enhanced base query to handle token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    // baseUrl: "http://10.0.70.208:3000/api/",
    baseUrl: "https://azizul3000.binarybards.online/api",
    prepareHeaders: (headers) => {
      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");
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
  const refreshToken = Cookies.get("refreshToken");
  if (result.error) {
    if (result.error.status === 401) {
      // Call the refresh token API
      const refreshResult = await baseQuery(
        {
          url: "/profile",
          method: "GET",
          // body: { refreshToken: refreshToken },
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("refreshToken")
            )}`,
          },
        }, // No body needed
        api,
        extraOptions
      );

      console.log("Refresh token API result:", refreshResult);

      if (!refreshResult?.data) {
        console.error("Refresh token invalid or expired. Logging out...");
        localStorage.removeItem("authToken");
        localStorage.removeItem("adminRole");
        localStorage.removeItem("refreshToken");
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("refreshToken");
        Cookies.remove("refreshToken");
        toast("Access token has expired, Please login again.");
        window.location.replace("/auth/login");
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
export const imageUrl = "http://10.0.70.208:3000/api";
