import { Header } from '@components/Header'
import { Input } from '@components/Input'
import { Product } from '@components/Product'
import {
  Text,
  VStack,
  Pressable,
  HStack,
  useTheme,
  Heading,
  Divider,
  FlatList,
} from 'native-base'
import {
  ArrowRight,
  MagnifyingGlass,
  Sliders,
  Tag,
} from 'phosphor-react-native'
import { useState } from 'react'

export function Home() {
  const { colors } = useTheme()
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

            <HStack
              bgColor="lightBlue.100"
              p={3}
              borderRadius={8}
              justifyContent="space-between"
              alignItems="center"
            >
              <HStack alignItems="center">
                <Tag size={24} color={colors.blue} />
                <VStack ml={2}>
                  <Heading fontWeight="bold" fontSize="lg">
                    4
                  </Heading>
                  <Text color="gray.200">anúncios ativos</Text>
                </VStack>
              </HStack>
              <HStack>
                <Text mr={4} fontWeight="bold" color="blue">
                  Meus anúncios
                </Text>
                <ArrowRight size={24} color={colors.blue} />
              </HStack>
            </HStack>

            <Text mt={8} mb={3} color="gray.300" fontSize="sm">
              Compre produtos variados
            </Text>

            <Input
              placeholder="Buscar anúncio"
              mb={6}
              InputRightElement={
                <HStack>
                  <Pressable>
                    <MagnifyingGlass />
                  </Pressable>
                  <Divider
                    orientation="vertical"
                    mx={2}
                    h={6}
                    bgColor="gray.400"
                  />
                  <Pressable mr={2}>
                    <Sliders />
                  </Pressable>
                </HStack>
              }
            />
          </>
        }
        keyExtractor={(item, index) => String(`${index}`)}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => <Product />}
      ></FlatList>
    </VStack>
  )
}
