import { apiSlice } from '@api/apiSlice'
import { Button } from '@components/Button'
import {
  useDeleteProductsMutation,
  useUpdateProductsMutation,
  useUpdateStatusProductsMutation,
} from '@features/ProductsApiSlice'
import { updateStatusProdut } from '@features/ProductsSlice'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { VStack, useTheme } from 'native-base'
import { Power, Trash } from 'phosphor-react-native'

export function FooterAdminPreview() {
  const dispatch = useAppDispatch()
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const { colors } = useTheme()
  const [updateProduct, { isLoading: isLoadingUpdate }] =
    useUpdateStatusProductsMutation()
  const [deleteProduct, { isLoading: isLoadingDelete }] =
    useDeleteProductsMutation()
  const {
    is_active,
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

  async function hundleUpdatedStatus() {
    await updateProduct({
      id,
      is_active: !is_active,
    })

    dispatch(updateStatusProdut())
  }

  async function hundleDeleteProduct() {
    await deleteProduct(id)
    navigation.navigate('home')
  }

  return (
    <VStack px={5} py={6}>
      {is_active ? (
        <Button
          mb={1}
          isLoading={isLoadingUpdate}
          onPress={hundleUpdatedStatus}
          title="Desativar anúncio"
          bgColor="gray.100"
          leftIcon={<Power size={18} color="white" />}
        />
      ) : (
        <Button
          mb={1}
          isLoading={isLoadingUpdate}
          onPress={hundleUpdatedStatus}
          title="Reativar anúncio"
          bgColor="blue"
          leftIcon={<Power size={18} color="white" />}
        />
      )}
      <Button
        isLoading={isLoadingDelete}
        onPress={hundleDeleteProduct}
        title="Excluir anúncio"
        bgColor="gray.400"
        colorText="gray.100"
        leftIcon={<Trash size={18} color={colors.gray[100]} />}
      />
    </VStack>
  )
}
