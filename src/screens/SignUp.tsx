import {
  Button as ButtonNativeBase,
  Center,
  Heading,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react-native'

import LogoSvg from '@assets/logox1.svg'
import AvatarSvg from '@assets/avatar.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
export function SignUp() {
  const { colors } = useTheme()
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={12} bgColor="gray.600">
        <Center mt={20} mb={5}>
          <LogoSvg />
          <Heading fontSize="3xl" color="gray.100" fontWeight="bold">
            Boas vindas!
          </Heading>
          <Text color="gray.300" mt={2} fontSize="sm" textAlign="center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Center>
          <AvatarSvg />
          <Input placeholder="Nome" mt={4} />
          <Input placeholder="E-mail" />
          <Input placeholder="Telefone" />
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
          <Input
            placeholder="Senha"
            type={showConfirmPassword ? 'text' : 'password'}
            InputRightElement={
              <ButtonNativeBase
                rounded="none"
                h="full"
                variant="link"
                _text={{ color: 'gray.300' }}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Eye color={colors.gray[400]} weight="regular" />
                ) : (
                  <EyeSlash color={colors.gray[400]} weight="regular" />
                )}
              </ButtonNativeBase>
            }
          />

          <Button bgColor="gray.100" title="Criar" />
        </Center>

        <Center my={10}>
          <Text mb={1}>Já tem uma conta?</Text>
          <Button
            bgColor="gray.500"
            colorText="gray.200"
            title="Ir para o login"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
