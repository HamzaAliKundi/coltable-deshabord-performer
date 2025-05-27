import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mediaApi = createApi({
  reducerPath: "mediaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addImage: builder.mutation({
      query: (image: string) => ({
        url: `/api/performer/media/add-image`,
        method: "POST",
        body: { image }
      }),
    }),
    getAllImages: builder.query({
      query: () => `/api/performer/media/get-all-images`,
      keepUnusedDataFor: 0
    }),
    deleteImage: builder.mutation({
      query: (id: string) => ({
        url: `/api/performer/media/delete-image/${id}`,
        method: "DELETE"
      }),
    }),
    addImages: builder.mutation({
      query: (images: { image: string }[]) => ({
        url: '/api/performer/media/add-images',
        method: 'POST',
        body: { images },
      }),
    }),
  }),
});

export const { useAddImageMutation, useGetAllImagesQuery, useDeleteImageMutation, useAddImagesMutation } = mediaApi;