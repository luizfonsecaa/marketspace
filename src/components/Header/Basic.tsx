import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { Box, Heading, HStack, Pressable } from 'native-base'
import { ArrowLeft, PencilSimpleLine } from 'phosphor-react-native'

type Props = {
  name: string
}

export function Basic({ name }: Props) {
  const navigation = useNavigation<AppNavigationRoutesProps>()
  const route = useRoute()
  const { product, user } = useAppSelector((state) => state)
  function handleEditProduct() {
    console.log('fui!!')
    navigation.navigate('newAdds')
  }

  return (
    <HStack mt={20} mb={7} alignItems="center" justifyContent="center">
      <Box position="absolute" left={5}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </Pressable>
      </Box>
      {name && <Heading fontSize="lg">{name}</Heading>}
      {product?.user_id === user?.user?.id &&
        route.name == 'productDetails' && (
          <Box position="absolute" right={5}>
            <Pressable onPress={handleEditProduct}>
              <PencilSimpleLine />
            </Pressable>
          </Box>
        )}
    </HStack>
  )
}
