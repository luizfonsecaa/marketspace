import { VStack, Text, HStack } from 'native-base'

type Props = {
  payment_methods: string[]
}
import { Money, QrCode, Barcode, CreditCard, Bank } from 'phosphor-react-native'
export function PaymentMethod({ payment_methods }: Props) {
  return (
    <VStack px={5} mt={3}>
      <Text pr={2} mb={2} fontWeight="bold" fontFamily="heading">
        Meios de pagamento:
      </Text>
      {payment_methods.includes('boleto') && (
        <HStack alignItems="center">
          <Barcode size={18} />
          <Text ml={1}>Boleto</Text>
        </HStack>
      )}

      {payment_methods.includes('pix') && (
        <HStack alignItems="center">
          <QrCode size={18} />
          <Text ml={1}>Pix</Text>
        </HStack>
      )}

      {payment_methods.includes('cash') && (
        <HStack alignItems="center">
          <Money size={18} />
          <Text ml={1}>Dinheiro</Text>
        </HStack>
      )}

      {payment_methods.includes('card') && (
        <HStack alignItems="center">
          <CreditCard size={18} />
          <Text ml={1}>Cartão de Crédito</Text>
        </HStack>
      )}

      {payment_methods.includes('deposit') && (
        <HStack alignItems="center">
          <Bank size={18} />
          <Text ml={1}>Deposito bancario</Text>
        </HStack>
      )}
    </VStack>
  )
}
