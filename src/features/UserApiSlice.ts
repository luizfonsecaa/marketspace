import { apiSlice } from '@api/apiSlice'

export const user = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegister: builder.mutation({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `users/`,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        body: data,
        method: 'POST',
        url: `/sessions/`,
      }),
    }),
  }),
})

export const { useUserRegisterMutation, useLoginMutation } = user
