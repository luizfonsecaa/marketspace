import { Platform, Text } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { House, Tag, SignOut } from 'phosphor-react-native'
import { Pressable, useTheme } from 'native-base'

import { Home } from '@screens/Home'
import { Ads } from '@screens/Ads'
import { NewAds } from '@screens/NewAds'
import { ProductDetails } from '@screens/ProductDetails'
import { useAppDispatch } from '@hooks/useStore'
import { logout } from '@features/UserSlice'
import { apiSlice } from '@api/apiSlice'

type AuthRoutes = {
  home: undefined
  ads: undefined
  newAdds: undefined
  exit: undefined
  preview: undefined
  productDetails: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AuthRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()
  const dispatch = useAppDispatch()
  const iconSize = sizes[6]
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          height: Platform.OS === 'android' ? 'auto' : 70,
          paddingBottom: sizes[6],
          paddingTop: sizes[6],
        },
        unmountOnBlur: true,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={iconSize} color={color} />,
        }}
      />
      <Screen
        name="ads"
        component={Ads}
        options={{
          tabBarIcon: ({ color }) => <Tag size={iconSize} color={color} />,
        }}
      />
      <Screen
        name="productDetails"
        component={ProductDetails}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="preview"
        component={ProductDetails}
        options={{ tabBarButton: () => null }}
      />
      <Screen
        name="exit"
        component={() => null}
        options={{
          tabBarIcon: ({ color }) => <SignOut size={iconSize} color="red" />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            dispatch(apiSlice.util.resetApiState())
            dispatch(logout(undefined))
          },
        })}
      />
      <Screen
        name="newAdds"
        component={NewAds}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
