import { Header } from '@components/Header'
import { Product } from '@components/Product'
import { useUserProductsQuery } from '@features/ProductsApiSlice'
import {
  HStack,
  VStack,
  Text,
  Box,
  Select,
  CheckIcon,
  FlatList,
} from 'native-base'
import { useState } from 'react'

export function Ads() {
  const [service, setService] = useState('todos')
  const { data, isFetching } = useUserProductsQuery({})
  return (
    <VStack flex={1} px={6} bgColor="gray.600">
      <Header type="basic" name="Meus Anúncios" />

      <HStack alignItems="center" justifyContent="space-between">
        <Text>9 anúncios</Text>
        <Box maxW="130">
          <Select
            rounded="md"
            selectedValue={service}
            minWidth="130"
            accessibilityLabel="Choose Service"
            placeholder="Choose Service"
            _selectedItem={{
              endIcon: <CheckIcon size="5" />,
            }}
            mt={1}
            onValueChange={(itemValue) => setService(itemValue)}
          >
            <Select.Item label="Todos" value="todos" />
            <Select.Item label="Novo" value="novo" />
            <Select.Item label="Usado" value="usado" />
            <Select.Item label="Desativado" value="desativado" />
          </Select>
        </Box>
      </HStack>
      <FlatList
        mt={5}
        data={data}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <Product product={item} />}
      ></FlatList>
    </VStack>
  )
}
