import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPerformerProfile: builder.query({
      query: () => `/auth/user/get-profile`,
    }),
    updatePerformerProfile: builder.mutation({
      query: ({ data }: { data: any }) => ({
        url: `auth/user/update-profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    getAllVenues: builder.query({
      query: () => "/api/performer/venue/get-all-venues",
    }),
    getAllPerformers: builder.query({
      query: () => "/api/venue/performer/get-all-performers",
    }),
    changePassword: builder.mutation({
      query: (data: { newPassword: string }) => ({
        url: "/auth/user/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetPerformerProfileQuery, useUpdatePerformerProfileMutation, useGetAllVenuesQuery, useGetAllPerformersQuery, useChangePasswordMutation } = profileApi;
