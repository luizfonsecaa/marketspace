import { Heading, Text, VStack } from "native-base";

export function Preview() {
  return (
    <VStack
      pt={16}
      pb={4}
      bgColor="blue"
      alignItems="center"
      justifyContent="center"
    >
      <Heading fontSize="md" fontFamily="heading" color="gray.700">
        Pré visualização do anúncio
      </Heading>
      <Text color="gray.700">É assim que seu produto vai aparecer!</Text>
    </VStack>
  );
}
