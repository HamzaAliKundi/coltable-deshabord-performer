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
    addEvent: builder.mutation({
      query: (eventData: any) => ({
        url: "/api/performer/event/add-event",
        method: "POST",
        body: eventData,
      }),
    }),
    getAllEvents: builder.query({
      query: ({limit = 10, page = 1}) => ({
        url: `/api/performer/event/get-all-events?limit=${limit}&page=${page}`,
        method: "GET"
      }),
    }),
    getEventById: builder.query({
      query: (eventId: string) => ({
        url: `/api/performer/event/get-single-event/${eventId}`,
        method: "GET"
      }),
    }),
    deleteEvent: builder.mutation({
      query: (eventId: string) => ({
        url: `/api/performer/event/delete-event/${eventId}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useDeleteEventMutation,
} = eventsApi;
