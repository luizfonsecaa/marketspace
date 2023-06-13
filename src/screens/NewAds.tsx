import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import {
  Heading,
  VStack,
  Text,
  Radio,
  Stack,
  HStack,
  Switch,
  Checkbox,
  ScrollView,
  Pressable,
  Spinner,
  Image,
  useToast,
} from 'native-base'
import { Plus, X } from 'phosphor-react-native'
import { useUploadImage } from '@hooks/useUploadImage'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { setProducts } from '@features/ProductsSlice'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { useEffect } from 'react'
import { paymentMethod } from '@dtos/paymentMethods'
type FormDataProps = {
  name: string
  description: string
  is_new: string
  price: string
  accept_trade: boolean
  payment_methods: string[]
}

const signInSchema = yup.object({
  name: yup.string().required('Campo requirido'),
  description: yup.string().required('Campo requirido'),
  is_new: yup.string().required('Campo requirido'),
  price: yup.string().required('Campo requirido'),
  accept_trade: yup.boolean().required('Campo requirido'),
  payment_methods: yup
    .array()
    .test('payment_methods', 'Campo requirido', (value) => {
      if (value !== undefined) {
        if (value.length === 0) return false
        else return true
      } else return value !== undefined
    }),
})

export function NewAds() {
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const dispatch = useAppDispatch()
  const toast = useToast()
  const {
    photoIsLoading,
    photoProduct,
    handleDeletePhoto,
    handleUserPhotoSelect,
    handleSetPhoto,
  } = useUploadImage()

  const {
    description,
    name,
    price,
    accept_trade,
    payment_methods,
    is_new,
    photos,
    user_id,
    id,
  } = useAppSelector((state) => state.product)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormDataProps>({
    resolver: yupResolver(signInSchema),
  })

  useEffect(() => {
    console.log('passando')
    if (id) {
      console.log('entrei')
      setValue('name', name)
      setValue('description', description)
      setValue('is_new', is_new === true ? 'true' : 'false')
      setValue('price', String(price))
      setValue('accept_trade', accept_trade)
      setValue('payment_methods', payment_methods)
      console.log(photos)
      handleSetPhoto(photos)
      // console.log(photoProduct)
    } else {
      setValue('name', '')
      setValue('description', '')
      setValue('is_new', '')
      setValue('price', '')
      setValue('accept_trade', false)
      setValue('payment_methods', [])
    }
  }, [id])

  function handleNext(data: FormDataProps) {
    if (photoProduct.length === 0) {
      toast.show({
        title: 'Necessario selecionar pelo menos uma imagem',
        placement: 'top',
        bgColor: 'error.700',
      })
    } else {
      dispatch(
        setProducts({
          ...data,
          user_id,
          id,
          photos: photoProduct,
          is_preview: true,
        })
      )
      navigation.navigate('preview')
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={6} bgColor="gray.600">
        <Header type="basic" name="Criar Anúncios" />
        <Heading color="gray.200" fontSize="md">
          Imagens
        </Heading>

        <Text color="gray.300" mb={5}>
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <ScrollView horizontal={true}>
          <HStack space={2}>
            <Pressable
              disabled={photoIsLoading}
              onPress={() => handleUserPhotoSelect(true, 3)}
            >
              <HStack
                w="24"
                h="24"
                bgColor="gray.500"
                borderRadius={10}
                justifyContent="center"
                alignItems="center"
              >
                {photoIsLoading ? <Spinner /> : <Plus />}
              </HStack>
            </Pressable>
            {photoProduct.map((e, index) => (
              <Pressable
                key={index}
                onPress={() => handleDeletePhoto(e, index)}
              >
                <VStack
                  key={index}
                  position="absolute"
                  zIndex={1}
                  w={5}
                  h={5}
                  right={1}
                  top={1}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius="full"
                  bgColor="gray.100"
                >
                  <X size={12} color="white" />
                </VStack>
                <Image
                  w="24"
                  h="24"
                  borderRadius={10}
                  resizeMode="cover"
                  alt="Product Image"
                  source={{
                    uri: e.uri,
                  }}
                />
              </Pressable>
            ))}
          </HStack>
        </ScrollView>

        <Heading color="gray.200" fontSize="md" mt={8} mb={4}>
          Sobre o produto
        </Heading>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Titulo do anúncio"
              mt={4}
              value={value}
              borderRadius="lg"
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Descrição do produto"
              mt={4}
              value={value}
              borderRadius="lg"
              multiline={true}
              numberOfLines={10}
              h={150}
              onChangeText={onChange}
              errorMessage={errors.description?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="is_new"
          render={({ field: { onChange, value } }) => (
            <>
              <Radio.Group
                name="myRadioGroup"
                accessibilityLabel="favorite number"
                value={value}
                onChange={(nextValue) => {
                  onChange(nextValue)
                }}
              >
                <HStack w="full">
                  <Stack direction="row" w="full" space={4}>
                    <Radio value="true" my={1}>
                      Produto novo
                    </Radio>
                    <Radio value="false" my={1}>
                      Produto usado
                    </Radio>
                  </Stack>
                </HStack>
              </Radio.Group>
              <Text color="error.700" mt={1}>
                {errors.is_new?.message}
              </Text>
            </>
          )}
        />

        <Heading color="gray.200" fontSize="md" mt={8} mb={4}>
          Venda
        </Heading>

        <Controller
          control={control}
          name="price"
          render={({ field: { onChange, value } }) => (
            <Input
              placeholder="Valor"
              mt={4}
              value={value}
              borderRadius="lg"
              InputLeftElement={
                <Text fontSize="md" ml={5}>
                  R$
                </Text>
              }
              onChangeText={onChange}
              errorMessage={errors.price?.message}
            />
          )}
        />

        <Heading color="gray.200" fontSize="md" mt={2} mb={2}>
          Aceita troca?
        </Heading>

        <Controller
          control={control}
          name="accept_trade"
          render={({ field: { onChange, value } }) => (
            <>
              <Switch value={value} size="md" onToggle={(e) => onChange(e)} />
              <Text color="error.700" mt={1}>
                {errors.accept_trade?.message}
              </Text>
            </>
          )}
        />

        <Heading color="gray.200" fontSize="md" mt={5} mb={1}>
          Meios de pagamento aceitos
        </Heading>

        <Controller
          control={control}
          name="payment_methods"
          render={({ field: { onChange, value } }) => (
            <>
              <Checkbox.Group
                onChange={(value) => onChange(value)}
                value={value}
              >
                {paymentMethod.map((e) => (
                  <Checkbox key={e.value} value={e.value} my={2}>
                    {e.title}
                  </Checkbox>
                ))}
              </Checkbox.Group>
              <Text color="error.700" mt={1}>
                {errors.payment_methods?.message}
              </Text>
            </>
          )}
        />
      </VStack>
      <HStack flex={1} px={6} pt={6} pb={10}>
        <Button
          onPress={() => navigation.goBack()}
          w="1/2"
          mr={1}
          title="Cancelar"
          bgColor="gray.400"
          colorText="gray.100"
        />
        <Button
          w="1/2"
          ml={1}
          title="Avançar"
          bgColor="gray.100"
          onPress={handleSubmit(handleNext)}
        />
      </HStack>
    </ScrollView>
  )
}
