import { Button } from '@components/Button'
import {
  useSetProductsImageMutation,
  useSetProductsMutation,
  useUpdateProductsMutation,
} from '@features/ProductsApiSlice'
import { clearProducts } from '@features/ProductsSlice'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { HStack, useTheme } from 'native-base'
import { ArrowLeft, Tag } from 'phosphor-react-native'

export function FooterPreview() {
  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const [setProducts, { isLoading }] = useSetProductsMutation()
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateProductsMutation()
  const dispatch = useAppDispatch()
  const [setProductsImage, { isLoading: isLoadingImage }] =
    useSetProductsImageMutation()
  const {
    description,
    name,
    price,
    accept_trade,
    payment_methods,
    is_new,
    photos,
    id,
  } = useAppSelector((state) => state.product)
  async function handlePublishProduct() {
    try {
      if (id == '') {
        const { data } = await setProducts({
          description,
          name,
          price: Number(price) * 100,
          accept_trade,
          payment_methods,
          is_new: is_new === 'false' ? false : true,
        })
        const fd = new FormData()
        fd.append('product_id', data.id)
        photos.forEach((photo) => fd.append('images', photo))
        await setProductsImage(fd)
      } else {
        let newPhotos = []
        photos.forEach((photo) => {
          if (photo.uri.search('http') === -1) newPhotos.push(photo)
        })
        await updateProduct({
          description,
          name,
          price: Number(price) * 100,
          accept_trade,
          payment_methods,
          id,
          is_new: is_new === 'false' ? false : true,
        })

        const fd = new FormData()
        fd.append('product_id', id)
        newPhotos.forEach((photo) => fd.append('images', photo))
        await setProductsImage(fd)
      }
      dispatch(clearProducts())
      navigation.navigate('home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <HStack px={5} py={6} justifyContent="space-between" alignItems="center">
      <Button
        w="1/2"
        mr={1}
        onPress={() => navigation.navigate('newAdds')}
        title="Voltar e editar"
        isLoading={isLoading}
        bgColor="gray.400"
        colorText="gray.100"
        leftIcon={<ArrowLeft size={18} color={colors.gray[100]} />}
      />
      <Button
        w="1/2"
        ml={1}
        isLoading={isLoading}
        onPress={handlePublishProduct}
        title="Publicar"
        bgColor="blue"
        leftIcon={<Tag size={18} color="white" />}
      />
    </HStack>
  )
}
