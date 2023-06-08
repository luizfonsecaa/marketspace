import { createSlice } from '@reduxjs/toolkit'

import { ICommon } from '@dtos/Common'

const initialState = {
  refresh_token: '',
  token: '',
  user: {
    avatar: '',
    created_at: '',
    email: '',
    id: '',
    name: '',
    tel: '',
    updated_at: '',
  },
} as ICommon

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logout: (state, action) => {
      state.refresh_token = ''
      state.token = ''
      state.user = {
        avatar: '',
        created_at: '',
        email: '',
        id: '',
        name: '',
        tel: '',
        updated_at: '',
      }
    },

    setUserClient: (state, action) => {
      state.refresh_token = action.payload.refresh_token
      state.token = action.payload.token
      state.user = {
        avatar: action.payload.user.avatar,
        created_at: action.payload.user.created_at,
        email: action.payload.user.email,
        id: action.payload.user.id,
        name: action.payload.user.name,
        tel: action.payload.user.tel,
        updated_at: action.payload.updated_at,
      }
    },

    setToken(state, action) {
      console.log(action.payload)
      state.token = action.payload
    },
  },
})

export const { setUserClient, logout, setToken } = userSlice.actions
export const userReducer = userSlice.reducer
