import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: (params) => ({
        url: `/api/performer/review/get-all-reviews`,
        params: {
          limit: params?.limit || 10,
          page: params?.page || 1,
        },
      }),
    }),
    featureReview: builder.mutation({
      query: (body) => ({
        url: `/api/performer/review/feature-review`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const { useGetAllReviewsQuery, useFeatureReviewMutation } = reviewsApi;
