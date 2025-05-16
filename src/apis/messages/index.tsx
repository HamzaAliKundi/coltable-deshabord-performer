import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: () => ({
        url: "/api/performer/chat/get-all-chats",
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getChatMessages: builder.query({
      query: (chatId) => ({
        url: `/api/performer/chat/get-chat-messages?chatId=${chatId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllChatsQuery,
  useGetChatMessagesQuery
} = messagesApi;
