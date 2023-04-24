import { Button } from "@components/Button";
import { HStack, Heading, Text } from "native-base";
import { WhatsappLogo } from "phosphor-react-native";

export function FooterDetails() {
  return (
    <HStack px={5} py={6} justifyContent="space-between" alignItems="center">
      <HStack alignItems="flex-end">
        <Text fontSize="lg" color="blue">
          R$
        </Text>
        <Heading fontSize="3xl" color="blue">
          120,00
        </Heading>
      </HStack>
      <Button
        w="1/2"
        bgColor="blue"
        title="Entrar em contato"
        leftIcon={<WhatsappLogo weight="fill" size={18} color="white" />}
      />
    </HStack>
  );
}
