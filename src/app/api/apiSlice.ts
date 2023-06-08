import { API_URL, SITE_URL } from '@env'
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import { RootState } from './../store'
import { logout, setToken } from '@features/UserSlice'

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = (getState() as RootState).user.token
    if (token) {
      headers.set('content-type', 'application/json')
      headers.set('authorization', `Bearer ${token}`)
    } else if (endpoint === 'userRegister') {
      headers.set('content-type', 'multipart/form-data')
    } else {
      headers.set('content-type', 'application/json')
    }
    return headers
  },
  referrer: SITE_URL,
  referrerPolicy: 'same-origin',
})

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result?.error?.status === 401) {
    console.log('401')
    let token = (api.getState() as RootState).user.token
    let refresh_token = (api.getState() as RootState).user.refresh_token
    const refreshResult = await baseQuery(
      {
        body: { token, refresh_token },
        headers: {
          append: 'refresh',
        },
        method: 'POST',
        url: '/sessions/refresh-token',
      },
      api,
      extraOptions
    )
    if (refreshResult?.data) {
      api.dispatch(setToken(refreshResult.data?.token))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout(undefined))
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['userProducts', 'invalidatedUser'],
})
