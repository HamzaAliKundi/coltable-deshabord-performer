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

    updateEvent: builder.mutation({
      query: ({ eventData, id }) => ({
        url: `/api/performer/event/update-event/${id}`,
        method: "PATCH",
        body: eventData,
      }),
    }),

    updatePerformerEventStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/api/performer/event/update-performer-event-status/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),

    getAllEvents: builder.query({
      query: ({ limit, page, status }) => ({
        url: `/api/performer/event/get-all-events?limit=${limit}&page=${page}&status=${status}`,
        method: "GET",
      }),
    }),

    getAllPerformerEvents: builder.query({
      query: ({ limit, page }) => ({
        url: `/api/performer/event/get-all-performer-events?limit=${limit}&page=${page}`,
        method: "GET",
      }),
    }),

    getEventById: builder.query({
      query: (eventId: string) => ({
        url: `/api/performer/event/get-single-event/${eventId}`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    deleteEvent: builder.mutation({
      query: (eventId: string) => ({
        url: `/api/performer/event/delete-event/${eventId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddEventMutation,
  useGetAllEventsQuery,
  useGetEventByIdQuery,
  useDeleteEventMutation,
  useUpdateEventMutation,
  useGetAllPerformerEventsQuery,
  useUpdatePerformerEventStatusMutation,
} = eventsApi;
