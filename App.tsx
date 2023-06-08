import { StatusBar } from 'react-native'
import { NativeBaseProvider } from 'native-base'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'

import { Loading } from '@components/Loading'
import { THEME } from './src/theme'
import { persistor, store } from './src/app/store'
import { Routes } from '@routes/index'
export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={THEME}>
        <StatusBar barStyle="dark-content" backgroundColor="black" />
        <PersistGate loading={null} persistor={persistor}>
          {fontsLoaded ? <Routes /> : <Loading />}
        </PersistGate>
      </NativeBaseProvider>
    </Provider>
  )
}
