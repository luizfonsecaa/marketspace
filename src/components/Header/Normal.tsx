import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { Avatar, Heading, HStack, useTheme, VStack, Text } from 'native-base'
import { Plus } from 'phosphor-react-native'

export function Normal() {
  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigationRoutesProps>()

  function handleNewAdd() {
    navigation.navigate('newAdds', { id: 0 })
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
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
          }}
        ></Avatar>

        <VStack ml={3}>
          <Text fontSize="md">Boas Vindas,</Text>
          <Heading fontSize="md" fontWeight="bold">
            Luiz!
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
