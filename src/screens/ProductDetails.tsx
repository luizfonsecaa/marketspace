import { VStack, HStack, Text, ScrollView } from 'native-base'

import { Header } from '@components/Header'
import { AvatarName } from '@components/ProductDetails/AvatarName'
import { Badge } from '@components/Badge'
import { PaymentMethod } from '@components/ProductDetails/PaymentMethod'
import { ImageDetails } from '@components/ProductDetails/ImageDetails'
import { ProductHeaderDetails } from '@components/ProductDetails/ProductHeaderDetails'
import { AcceptExchange } from '@components/ProductDetails/AcceptExchange'
import { FooterAdminPreview } from '@components/ProductDetails/FooterAdminPreview'
import { FooterDetails } from '@components/ProductDetails/FooterDetails'
import { FooterPreview } from '@components/ProductDetails/FooterPreview'
import { useRoute } from '@react-navigation/native'
import { useAppSelector } from '@hooks/useStore'

export function ProductDetails() {
  const route = useRoute()
  const {
    description,
    name,
    price,
    accept_trade,
    payment_methods,
    is_new,
    photos,
    user_id,
  } = useAppSelector((state) => state.product)
  const { user } = useAppSelector((state) => state)
  return (
    <ScrollView>
      <Header type={route.name === 'preview' ? 'preview' : 'basic'} />
      <ImageDetails images={photos} />
      <VStack flex={1} bgColor="gray.600">
        <AvatarName />
        <HStack p={5}>
          <Badge title={is_new ? 'Novo' : 'Usado'} size={10} />
        </HStack>

        <ProductHeaderDetails title={name} price={price} />

        <Text px={5} pt={2}>
          {description}
        </Text>

        <AcceptExchange isChange={accept_trade} />
        <PaymentMethod payment_methods={payment_methods} />

        {route.name === 'productDetails' &&
          user_id &&
          user_id === user?.user?.id && <FooterAdminPreview />}
      </VStack>
      {user_id && user_id !== user?.user?.id && <FooterDetails />}

      {route.name === 'preview' && <FooterPreview />}
    </ScrollView>
  )
}
