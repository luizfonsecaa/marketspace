import { CardMyAdds } from '@components/Home/CardMyAdds'
import { Header } from '@components/Header'
import { Product } from '@components/Product'
import {
  Text,
  VStack,
  FlatList,
  Actionsheet,
  useDisclose,
  Heading,
  Checkbox,
  Switch,
  Button,
  HStack,
  Box,
  ScrollView,
  Pressable,
} from 'native-base'
import { Search } from '@components/Home/Search'
import {
  useProductsQuery,
  useUserProductsQuery,
} from '@features/ProductsApiSlice'
import { useState } from 'react'
import { paymentMethod } from '@dtos/paymentMethods'
import { X } from 'phosphor-react-native'

export function Home() {
  const { data, isFetching } = useProductsQuery({})
  const { isOpen, onOpen, onClose } = useDisclose()
  const [payment, setPayment] = useState([])
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [isNew, setIsNew] = useState(false)
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
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <VStack
          p={5}
          h="60%"
          w="full"
          backgroundColor="white"
          borderRadius={20}
        >
          <ScrollView>
            <HStack mb={5} justifyContent="space-between" alignItems="center">
              <Heading>Filtrar anúncio</Heading>
              <Pressable onPress={onClose}>
                <X size={20} color="black" />
              </Pressable>
            </HStack>

            <Text color="gray.200" fontSize="md" mt={2} mb={2}>
              Condições
            </Text>

            <HStack>
              <Button
                onPress={() => setIsNew(true)}
                p={1}
                m={1}
                bgColor={isNew ? 'blue_light' : 'gray.500'}
                borderRadius="full"
                w="1/4"
                endIcon={
                  isNew ? (
                    <VStack p={0.5} backgroundColor="white" borderRadius="full">
                      <X size={10} color="black" />
                    </VStack>
                  ) : (
                    <></>
                  )
                }
              >
                <Text color={isNew ? 'white' : 'black'}>Novo</Text>
              </Button>
              <Button
                onPress={() => setIsNew(false)}
                p={1}
                m={1}
                bgColor={!isNew ? 'blue_light' : 'gray.500'}
                borderRadius="full"
                w="1/4"
                endIcon={
                  !isNew ? (
                    <VStack p={0.5} backgroundColor="white" borderRadius="full">
                      <X size={10} color="black" />
                    </VStack>
                  ) : (
                    <></>
                  )
                }
              >
                <Text color={!isNew ? 'white' : 'black'}>Usado</Text>
              </Button>
            </HStack>

            <Text fontSize="md" mt={2} mb={2}>
              Aceita troca?
            </Text>

            <Switch
              onTrackColor="blue_light"
              value={acceptTrade}
              size="md"
              onToggle={setAcceptTrade}
            />

            <Text color="gray.200" fontSize="md" mt={5} mb={1}>
              Meios de pagamento aceitos
            </Text>
            <Checkbox.Group onChange={setPayment} value={payment}>
              {paymentMethod.map((e) => (
                <Checkbox key={e.value} value={e.value} my={2}>
                  {e.title}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </ScrollView>
        </VStack>
      </Actionsheet>
    </VStack>
  )
}
