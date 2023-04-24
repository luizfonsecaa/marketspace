import { Platform, Text } from 'react-native'
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'
import { House, Tag, SignOut } from 'phosphor-react-native'
import { useTheme } from 'native-base'

import { Home } from '@screens/Home'
import { Ads } from '@screens/Ads'

type AuthRoutes = {
  home: undefined
  ads: undefined
  exit: undefined
}

export type AppNavigationRoutesProps = BottomTabNavigationProp<AuthRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

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
          height: Platform.OS === 'android' ? 'auto' : 64,
          paddingBottom: sizes[6],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <House size={28} color={color} />,
        }}
      />
      <Screen
        name="ads"
        component={Ads}
        options={{
          tabBarIcon: ({ color }) => <Tag size={28} color={color} />,
        }}
      />
      <Screen
        name="exit"
        component={() => null}
        options={{
          tabBarIcon: ({ color }) => <SignOut size={28} color="red" />,
        }}
        listeners={() => ({
          tabPress: (e) => {
            e.preventDefault()
            console.log('deslogando')
          },
        })}
      />
      {/* <Screen
        name='exercise'
        component={Exercise}
        options={{ tabBarButton: () => null }}
      /> */}
    </Navigator>
  )
}
