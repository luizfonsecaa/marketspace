import { HStack, Text } from "native-base";

type Props = {
  isChange: boolean;
};

export function AcceptExchange({ isChange }: Props) {
  return (
    <HStack px={5} pt={8}>
      <Text pr={2} fontWeight="bold" fontFamily="heading">
        Aceita troca?
      </Text>
      <Text>{isChange ? "Sim" : "Não"}</Text>
    </HStack>
  );
}
