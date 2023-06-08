import { PROJECT_FOLDER } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit'

import { persistReducer, persistStore } from 'redux-persist'

import { userReducer } from '@features/UserSlice'
import { productReducer } from '@features/ProductsSlice'

import { apiSlice } from './api/apiSlice'

const reducers = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  user: userReducer,
  product: productReducer,
})

const persistConfig = {
  blacklist: [apiSlice.reducerPath, 'product'],
  key: PROJECT_FOLDER,
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  reducer: persistedReducer,
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
