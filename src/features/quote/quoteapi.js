import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const quoteApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Quote'],
  endpoints: (builder) => ({
    getQuotes: builder.query({
      query: (userId) => `quotes/${userId}`,
      providesTags: ['Quote'],
    }),
    addQuote: builder.mutation({
      query: (newQuote) => ({
        url: 'quotes',
        method: 'POST',
        body: newQuote,
      }),
      invalidatesTags: ['Quote'],
    }),
    updateQuote: builder.mutation({
      query: (quotes) => ({
        url: `quotes/${quotes.id}`,
        method: 'PATCH',
        body: quotes,
      }),
      invalidatesTags: ['Quote'],
    }),
    deleteQuote: builder.mutation({
      query: (id) => ({
        url: `quotes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Quote'],
    }),
  }),
});

export const {
  useGetQuotesQuery,
  useAddQuoteMutation,
  useUpdateQuoteMutation,
  useDeleteQuoteMutation,
} = quoteApi;
