import { CardMyAdds } from '@components/Home/CardMyAdds'
import { Header } from '@components/Header'
import { Product } from '@components/Product'
import { Text, VStack, FlatList, useDisclose } from 'native-base'
import { Search } from '@components/Home/Search'

import { useProductsQuery } from '@features/ProductsApiSlice'
import { FilterHome } from '@components/FilterHome'
import { useAppSelector } from '@hooks/useStore'

export function Home() {
  const { filter } = useAppSelector((state) => state.product)
  const { data, isFetching } = useProductsQuery({
    is_new: filter.isNew,
    accept_trade: filter.acceptTrade,
    payment_methods: filter.payment,
  })
  const { isOpen, onOpen, onClose } = useDisclose()
  console.log(filter)
  return (
    <VStack flex={1} px={6} bgColor="gray.600">
      <Header />
      <FlatList
        data={data}
        ListHeaderComponent={
          <VStack key="10000">
            <Text key="1" fontSize="sm" color="gray.300" mb={2}>
              Seus produtos anunciados para venda
            </Text>

            <CardMyAdds key="2" />

            <Text key="3" mt={8} mb={3} color="gray.300" fontSize="sm">
              Compre produtos variados
            </Text>
            <Search key="4" open={onOpen} />
          </VStack>
        }
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <Product product={{ ...item, is_active: true }} />
        )}
        ListEmptyComponent={
          <Text textAlign="center">Nenhum produto encontrado</Text>
        }
      ></FlatList>

      <FilterHome isOpen={isOpen} onClose={onClose} />
    </VStack>
  )
}
