import { CardMyAdds } from '@components/Home/CardMyAdds'
import { Header } from '@components/Header'

import { Product } from '@components/Product'
import { Text, VStack, FlatList } from 'native-base'

import { useState } from 'react'
import { Seach } from '@components/Home/Seach'

export function Home() {
  const [Products, setProducts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

  return (
    <VStack flex={1} px={6} bgColor="gray.600">
      <Header />
      <FlatList
        data={Products}
        ListHeaderComponent={
          <>
            <Text fontSize="sm" color="gray.300" mb={2}>
              Seus produtos anunciados para venda
            </Text>

            <CardMyAdds />

            <Text mt={8} mb={3} color="gray.300" fontSize="sm">
              Compre produtos variados
            </Text>
            <Seach />
          </>
        }
        keyExtractor={(item) => String(item)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <Product key={item} />}
      ></FlatList>
    </VStack>
  )
}
