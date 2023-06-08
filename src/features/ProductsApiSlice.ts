import { apiSlice } from '@api/apiSlice'

import {
  FIVE_MINUTES_QUERY_DELAY,
  THREE_MINUTES_QUERY_DELAY,
} from '@store/utils/constants'
import stringifyURL from '@store/utils/stringify'

import { IListResponse } from '@dtos/Common'
import { ITrail, ITrailsQuery } from '@dtos/Trails'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        method: 'GET',
        url: `products/`,
      }),
    }),

    product: builder.query({
      query: (id) => ({
        method: 'GET',
        url: `products/${id}`,
      }),
    }),

    userProducts: builder.query({
      providesTags: ['userProducts'],
      query: () => ({
        method: 'GET',
        url: `users/products`,
      }),
    }),
    setProducts: builder.mutation({
      invalidatesTags: ['userProducts'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `products/`,
      }),
    }),

    updateProducts: builder.mutation({
      invalidatesTags: ['userProducts'],
      query: (data) => ({
        body: data,
        method: 'PUT',
        url: `products/${data.id}`,
      }),
    }),

    updateStatusProducts: builder.mutation({
      invalidatesTags: ['userProducts'],
      query: (data) => ({
        body: data,
        method: 'PATCH',
        url: `products/${data.id}`,
      }),
    }),

    setProductsImage: builder.mutation({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `products/images/`,
      }),
    }),
    deleteProductsImage: builder.mutation({
      query: (data) => ({
        body: data,
        method: 'DELETE',
        url: `products/images/`,
      }),
    }),
    deleteProducts: builder.mutation({
      invalidatesTags: ['userProducts'],
      query: (id) => ({
        method: 'DELETE',
        url: `products/${id}`,
      }),
    }),
  }),
})

export const {
  useProductsQuery,
  useUserProductsQuery,
  useSetProductsMutation,
  useSetProductsImageMutation,
  useLazyProductQuery,
  useDeleteProductsImageMutation,
  useUpdateProductsMutation,
  useUpdateStatusProductsMutation,
  useDeleteProductsMutation,
} = productsApiSlice
