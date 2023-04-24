import { VStack, Text, HStack } from "native-base";
import {
  Money,
  QrCode,
  Barcode,
  CreditCard,
  Bank,
} from "phosphor-react-native";
export function PaymentMethod() {
  return (
    <VStack px={5} mt={3}>
      <Text pr={2} mb={2} fontWeight="bold" fontFamily="heading">
        Meios de pagamento:
      </Text>
      <HStack alignItems="center">
        <Barcode size={18} />
        <Text ml={1}>Boleto</Text>
      </HStack>
      <HStack alignItems="center">
        <QrCode size={18} />
        <Text ml={1}>Pix</Text>
      </HStack>
      <HStack alignItems="center">
        <Money size={18} />
        <Text ml={1}>Dinheiro</Text>
      </HStack>
      <HStack alignItems="center">
        <CreditCard size={18} />
        <Text ml={1}>Cartão de credito</Text>
      </HStack>
      <HStack alignItems="center">
        <Bank size={18} />
        <Text ml={1}>Deposito bancario</Text>
      </HStack>
    </VStack>
  );
}
