import {
  Text,
  VStack,
  Actionsheet,
  useDisclose,
  Heading,
  Checkbox,
  Switch,
  Button,
  HStack,
  ScrollView,
  Pressable,
} from 'native-base'
import { X } from 'phosphor-react-native'
import { Button as ButtonNative } from '@components/Button'
import { useEffect, useState } from 'react'
import { paymentMethod } from '@dtos/paymentMethods'
import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { clearFilter, setFilter } from '@features/ProductsSlice'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function FilterHome({ isOpen, onClose }: Props) {
  const dispatch = useAppDispatch()
  const [payment, setPayment] = useState<string[]>([] as string[])
  const [acceptTrade, setAcceptTrade] = useState(false)
  const [isNew, setIsNew] = useState(false)
  const { filter } = useAppSelector((state) => state.product)
  function handleSetFilter() {
    dispatch(setFilter({ payment, acceptTrade, isNew }))
    onClose()
  }

  useEffect(() => {
    if (isOpen) {
      setPayment(filter.payment)
      setAcceptTrade(filter.acceptTrade)
      setIsNew(filter.isNew)
    }
  }, [isOpen])

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <VStack p={5} h="70%" w="full" backgroundColor="white" borderRadius={20}>
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
              <Checkbox colorScheme="info" key={e.value} value={e.value} my={2}>
                {e.title}
              </Checkbox>
            ))}
          </Checkbox.Group>
          <HStack mt={5}>
            <ButtonNative
              onPress={() => dispatch(clearFilter())}
              w="1/2"
              mr={1}
              title="Resetar filtros"
              bgColor="gray.400"
              colorText="gray.100"
            />
            <ButtonNative
              w="1/2"
              ml={1}
              title="Aplicar filtros"
              bgColor="gray.100"
              onPress={handleSetFilter}
            />
          </HStack>
        </ScrollView>
      </VStack>
    </Actionsheet>
  )
}
