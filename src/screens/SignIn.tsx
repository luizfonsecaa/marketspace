import {
  Button as ButtonNativeBase,
  Center,
  Heading,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import { Input } from '@components/Input'
import { Eye, EyeSlash } from 'phosphor-react-native'

import LogoSvg from '@assets/logo.svg'
import { useState } from 'react'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'
export function SignIn() {
  const { colors } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation<AuthNavigationRoutesProps>()
  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack px={12} bgColor="gray.600" borderRadius="3xl">
        <Center my={20}>
          <LogoSvg />
          <Heading fontSize="4xl" color="gray.100" fontWeight="bold">
            marketspace
          </Heading>
          <Text color="gray.300">Seu espaço de compra e venda</Text>
        </Center>

        <Center>
          <Text color="gray.200" mb={3}>
            Acesse sua conta
          </Text>
          <Input placeholder="E-mail" />
          <Input
            placeholder="Senha"
            type={showPassword ? 'text' : 'password'}
            InputRightElement={
              <ButtonNativeBase
                rounded="none"
                h="full"
                variant="link"
                _text={{ color: 'gray.300' }}
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye color={colors.gray[400]} weight="regular" />
                ) : (
                  <EyeSlash color={colors.gray[400]} weight="regular" />
                )}
              </ButtonNativeBase>
            }
          />

          <Button title="Entrar" variant="solid" mb={12} bgColor="blue_light" />
        </Center>
      </VStack>
      <VStack
        flex={1}
        px={12}
        justifyContent="center"
        mb={16}
        alignItems="center"
      >
        <Text my={3}>Ainda não tem acesso?</Text>
        <Button
          title="Criar uma conta"
          colorText="gray.200"
          variant="solid"
          bgColor="gray.500"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  )
}
