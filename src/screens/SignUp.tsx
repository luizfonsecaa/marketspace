import {
  Button as ButtonNativeBase,
  Center,
  Heading,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
  Image,
} from 'native-base'
import React, { useState } from 'react'
import { Eye, EyeSlash } from 'phosphor-react-native'

import LogoSvg from '@assets/logox1.svg'
import AvatarSvg from '@assets/avatar.svg'
import { Input } from '@components/Input'
import { Button } from '@components/Button'
import { useNavigation } from '@react-navigation/native'
import { useUserRegisterMutation } from '@features/UserApiSlice'
import { useUploadImage } from '@hooks/useUploadImage'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthNavigationRoutesProps } from '@routes/auth.routes'

type FormDataProps = {
  name: string
  email: string
  tel: string
  phone: string
  password: string
  confirm_password: string
}

const signInSchema = yup.object({
  email: yup.string().required('informe o e-mail.').email('E-mail inválido.'),
  name: yup.string().required('Informe o nome'),
  tel: yup.string().required('Informe o telefone'),
  password: yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos')
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref('password'), null], 'A confirmação de senha não confere'),
})

export function SignUp() {
  const { colors } = useTheme()
  const navigation = useNavigation<AuthNavigationRoutesProps>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [registerUser, { isLoading }] = useUserRegisterMutation()
  const { photoIsLoading, photoProduct, handleUserPhotoSelect } =
    useUploadImage(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleCreateduser({
    name,
    email,
    tel,
    password,
    confirm_password,
  }: FormDataProps) {
    try {
      const fd = new FormData()
      fd.append('name', name)
      fd.append('email', email.toLowerCase())
      fd.append('tel', tel)
      fd.append('password', password)
      fd.append('avatar', photoProduct[0])
      const register = await registerUser(fd)
      navigation.navigate('signIn')
    } catch (error) {
      console.log(error)
    }
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
          {photoProduct.length === 0 ? (
            <Pressable onPress={() => handleUserPhotoSelect(false)}>
              <AvatarSvg />
            </Pressable>
          ) : (
            <Pressable onPress={() => handleUserPhotoSelect(false)}>
              <Image
                h={24}
                w={24}
                borderRadius="full"
                resizeMode="cover"
                alt="Product Image"
                source={{
                  uri: photoProduct[0]?.uri,
                }}
              />
            </Pressable>
          )}

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                mt={4}
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E- mail"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="tel"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Telefone"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.tel?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                errorMessage={errors.password?.message}
                placeholder="Senha"
                value={value}
                onChangeText={onChange}
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
            )}
          />

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirme a senha"
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
            )}
          />

          <Button
            bgColor="gray.100"
            title="Criar"
            onPress={handleSubmit(handleCreateduser)}
          />
        </Center>

        <Center my={10}>
          <Text mb={1}>Já tem uma conta?</Text>
          <Button
            bgColor="gray.500"
            colorText="gray.200"
            isLoading={isLoading}
            title="Ir para o login"
            onPress={handleGoBack}
          />
        </Center>
      </VStack>
    </ScrollView>
  )
}
