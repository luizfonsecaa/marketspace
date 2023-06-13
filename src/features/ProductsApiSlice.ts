import { apiSlice } from '@api/apiSlice'
import stringifyURL from '@store/utils/stringify'

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: (filter) => ({
        method: 'GET',
        url: `products/?${stringifyURL(filter)}`,
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
