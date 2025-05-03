import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials: any) => ({
        url: "/auth/user/register",
        method: "POST",
        body: credentials,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (data: { token: string, userType: string }) => ({
        url: "/auth/user/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data: { email: string, userType: string }) => ({
        url: "/auth/user/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data: { token: string, newPassword: string, userType: string }) => ({
        url: "/auth/user/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useVerifyEmailMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;