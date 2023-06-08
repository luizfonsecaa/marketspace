import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
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
import { useLoginMutation } from '@features/UserApiSlice'
import { setUserClient } from '@features/UserSlice'
import { useAppDispatch } from '@hooks/useStore'

type FormData = {
  email: string
  password: string
}

const signInSchema = yup.object({
  email: yup.string().required('Email requirido').email('invalid_email'),
  password: yup.string().required('Senha requirido'),
})

export function SignIn() {
  const { colors } = useTheme()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const navigation = useNavigation<AuthNavigationRoutesProps>()
  const [login, { isLoading }] = useLoginMutation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  })

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  const handleLogin = async ({ email, password }: FormData) => {
    try {
      // .unrap() allows for try & catch
      const userData = await login({
        password,
        email: email,
      }).unwrap()
      console.log(userData)
      dispatch(setUserClient(userData))
    } catch (e: any) {
      console.log(e)
    }
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

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(val: string) => {
                  onChange(val.toLowerCase())
                }}
                value={value}
                errorMessage={errors?.email?.message && errors.email.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                onChangeText={onChange}
                value={value}
                type={showPassword ? 'text' : 'password'}
                onSubmitEditing={handleSubmit(handleLogin)}
                errorMessage={
                  errors?.password?.message && errors.password.message
                }
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
            )}
          />

          <Button
            title="Entrar"
            variant="solid"
            mb={12}
            bgColor="blue_light"
            onPress={handleSubmit(handleLogin)}
          />
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
