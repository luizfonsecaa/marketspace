import { Button } from "@components/Button";
import { HStack, useTheme } from "native-base";
import { ArrowLeft, Tag } from "phosphor-react-native";

export function FooterPreview() {
  const { colors } = useTheme();
  return (
    <HStack px={5} py={6} justifyContent="space-between" alignItems="center">
      <Button
        w="1/2"
        mr={1}
        title="Voltar e editar"
        bgColor="gray.400"
        colorText="gray.100"
        leftIcon={<ArrowLeft size={18} color={colors.gray[100]} />}
      />
      <Button
        w="1/2"
        ml={1}
        title="Publicar"
        bgColor="blue"
        leftIcon={<Tag size={18} color="white" />}
      />
    </HStack>
  );
}
