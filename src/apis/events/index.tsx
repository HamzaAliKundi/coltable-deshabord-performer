import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createEvent: builder.mutation({
      query: (eventData: any) => ({
        url: "/performer/create-event",
        method: "POST",
        body: eventData,
      }),
    }),
    getPerformerProfile: builder.query({
      query: (id: string) => `/performer/profile/${id}`,
    }),
    updatePerformerProfile: builder.mutation({
      query: ({ id, data }: { id: string; data: any }) => ({
        url: `/performer/profile/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useCreateEventMutation, useGetPerformerProfileQuery, useUpdatePerformerProfileMutation } = eventsApi;
