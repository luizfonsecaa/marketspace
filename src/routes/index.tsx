import { useTheme, Box } from 'native-base'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'
import { useAppSelector } from '@hooks/useStore'
export function Routes() {
  const { token } = useAppSelector((state) => state.user)
  const { colors } = useTheme()
  const theme = DefaultTheme
  theme.colors.background = colors.gray[700]

  return (
    <Box flex={1} bg="gray.700">
      <NavigationContainer theme={theme}>
        {token ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  )
}
