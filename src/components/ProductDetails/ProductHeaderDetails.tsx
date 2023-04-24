import { Heading, HStack, Text } from "native-base";

type Props = {
  title: string;
  price: string;
};

export function ProductHeaderDetails({ title, price }: Props) {
  return (
    <HStack px={5} justifyContent="space-between">
      <Heading fontWeight="bold">{title}</Heading>
      <HStack alignItems="flex-end">
        <Text color="blue_light">R$</Text>
        <Heading color="blue_light">{price}</Heading>
      </HStack>
    </HStack>
  );
}
