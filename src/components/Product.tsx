import { API_URL } from '@env'
import { useLazyProductQuery } from '@features/ProductsApiSlice'
import { setProducts } from '@features/ProductsSlice'
import { useAppDispatch } from '@hooks/useStore'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import {
  Avatar,
  Badge,
  Heading,
  Pressable,
  VStack,
  Image,
  Text,
  Box,
} from 'native-base'

type Props = {
  product: {
    id: boolean
    accept_trade: boolean
    is_new: boolean
    name: string
    price: number
    product_images: { id: string; path: string }[]
    user: { avatar: string }
  }
}

export function Product({ product }: Props) {
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const [getProduct, { data, isFetching }] = useLazyProductQuery()
  const dispatch = useAppDispatch()

  async function handleOpenProduct() {
    const { data } = await getProduct(product.id)
    dispatch(
      setProducts({
        ...data,
        payment_methods: data?.payment_methods?.map((method) => method.key),
        photos: data.product_images,
      })
    )
    navigation.navigate('productDetails')
  }

  return (
    <Pressable
      w="47%"
      mb={4}
      borderRadius={10}
      overflow="hidden"
      onPress={handleOpenProduct}
    >
      {product?.user?.avatar && (
        <Avatar
          position="absolute"
          zIndex={1}
          left={2}
          top={2}
          size={8}
          borderColor="white"
          borderWidth={1}
          bg="green.500"
          source={{
            uri: `${API_URL}images/${product.user.avatar}`,
          }}
        >
          AJ
        </Avatar>
      )}
      <Badge
        bgColor="gray.200"
        px={3}
        position="absolute"
        zIndex={1}
        right={2}
        top={2}
        borderRadius="full"
      >
        <Text
          color="white"
          fontWeight="bold"
          fontFamily="heading"
          fontSize="11"
        >
          {product.is_new ? 'NOVO' : 'USADO'}
        </Text>
      </Badge>

      <VStack position="static" borderRadius={10}>
        {product?.product_images.length > 0 && (
          <Image
            borderRadius={10}
            size="xl"
            alt="Product Image"
            w="full"
            source={{
              uri: `${API_URL}images/${product?.product_images[0].path}`,
            }}
          />
        )}
        {!product.is_active && (
          <>
            <VStack
              borderRadius={10}
              bg="blueGray.100"
              w="full"
              h="full"
              position="absolute"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            ></VStack>
            <Box position="absolute" zIndex={1} bottom={1}>
              <Text ml={2} color="white" fontSize="xs">
                ANÚNCIO DESATIVADO
              </Text>
            </Box>
          </>
        )}
      </VStack>

      <VStack pt={1}>
        <Text
          color={!product.is_active ? 'gray.400' : 'gray.100'}
          fontSize="md"
        >
          {product.name}
        </Text>
        <Heading
          color={!product.is_active ? 'gray.400' : 'gray.100'}
          fontSize="xl"
        >
          {product.price}
        </Heading>
      </VStack>
    </Pressable>
  )
}
{
}
