import { useAppSelector } from '@hooks/useStore'
import { Avatar, HStack, Text } from 'native-base'
import { API_URL } from '@env'
export function AvatarName() {
  const { user } = useAppSelector((state) => state.user)
  const { product } = useAppSelector((state) => state)
  return (
    <HStack px={5} pt={5} alignItems="center">
      <Avatar
        bg="green.500"
        alignSelf="center"
        borderColor="blue_light"
        borderWidth={2}
        size={9}
        source={{
          uri: product.user
            ? `${API_URL}images/${product.user.avatar}`
            : `${API_URL}images/${user.avatar}`,
        }}
      ></Avatar>
      <Text ml={2}>{product.user ? product.user.name : user.name}</Text>
    </HStack>
  )
}
