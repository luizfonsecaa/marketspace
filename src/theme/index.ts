import { extendTheme } from 'native-base'

export const THEME = extendTheme({
  colors: {
    blue: '#364d9d',
    blue_light: '#647ac7',
    red: '#ee7979',
    gray: {
      700: '#f7f7f8',
      600: '#edecee',
      500: '#d9d8da',
      400: '#9f9ba1',
      300: '#5f5b62',
      200: '#3e3a40',
      100: '#1a181b'
    },
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'Karla_700Bold',
    body: 'Karla_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  sizes: {
    11: 45
  }
})