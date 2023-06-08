import { Button } from '@components/Button'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { Avatar, Heading, HStack, useTheme, VStack, Text } from 'native-base'
import { Plus } from 'phosphor-react-native'
import { API_URL } from '@env'
import { clearProducts } from '@features/ProductsSlice'

export function Normal() {
  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const { user } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  function handleNewAdd() {
    dispatch(clearProducts())
    navigation.navigate('newAdds')
  }

  return (
    <HStack mt={20} mb={8}>
      <HStack flex={3}>
        <Avatar
          bg="green.500"
          alignSelf="center"
          borderColor="blue_light"
          borderWidth={2}
          size={11}
          source={{
            uri: `${API_URL}images/${user.avatar}`,
          }}
        ></Avatar>

        <VStack ml={3}>
          <Text fontSize="md">Boas Vindas,</Text>
          <Heading fontSize="md" fontWeight="bold">
            {user.name}!
          </Heading>
        </VStack>
      </HStack>
      <HStack flex={2}>
        <Button
          onPress={handleNewAdd}
          title="Criar anúncio"
          colorText="white"
          variant="solid"
          bgColor="gray.100"
          leftIcon={<Plus size={16} color={colors.gray[500]} />}
        />
      </HStack>
    </HStack>
  )
}
