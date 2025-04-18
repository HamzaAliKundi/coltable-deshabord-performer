import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../axiosInstance";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coltable-be.onrender.com/api/v1",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;