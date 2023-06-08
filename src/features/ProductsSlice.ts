import { createSlice } from '@reduxjs/toolkit'

type Product = {
  accept_trade: boolean
  description: string
  is_new: string
  name: string
  payment_methods: string[]
  photos: { name: string; type: string; uri: string }[]
  price: string
  is_active: boolean
  user_id: string
  id: string
  is_preview: boolean
  user: { avatar: string; name: string; tel: string } | {}
}
const initialState = {
  accept_trade: false,
  description: '',
  is_new: '',
  name: '',
  is_active: false,
  payment_methods: [],
  photos: [],
  price: '',
  user_id: '',
  id: '',
  user: {},
  is_preview: false,
} as Product

const productSlice = createSlice({
  initialState,
  name: 'product',
  reducers: {
    clearProducts: (state) => {
      state.accept_trade = false
      state.description = ''
      state.is_new = ''
      state.name = ''
      state.payment_methods = []
      state.photos = []
      state.id = ''
      state.is_active = false
      state.is_preview = false
      ;(state.price = ''), (state.user_id = ''), (state.user = {})
    },

    setProducts: (state, action) => {
      state.accept_trade = action.payload.accept_trade
      state.description = action.payload.description
      state.is_new = action.payload.is_new
      state.name = action.payload.name
      state.payment_methods = action.payload.payment_methods
      state.photos = action.payload.photos
      state.price = action.payload.price
      state.user_id = action.payload.user_id
      state.user = action.payload.user
      state.id = action.payload.id
      state.is_preview = action.payload.is_preview
      state.is_active = action.payload.is_active
    },

    updateStatusProdut: (state) => {
      state.is_active = !state.is_active
    },
  },
})

export const { clearProducts, setProducts, updateStatusProdut } =
  productSlice.actions
export const productReducer = productSlice.reducer
