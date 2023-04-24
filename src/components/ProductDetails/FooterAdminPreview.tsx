import { Button } from "@components/Button";
import { VStack, useTheme } from "native-base";
import { Power, Trash } from "phosphor-react-native";

type Props = {
  active: boolean;
};

export function FooterAdminPreview({ active }: Props) {
  const { colors } = useTheme();
  return (
    <VStack px={5} py={6}>
      {active ? (
        <Button
          mb={1}
          title="Desativar anúncio"
          bgColor="gray.100"
          leftIcon={<Power size={18} color="white" />}
        />
      ) : (
        <Button
          mb={1}
          title="Reativar anúncio"
          bgColor="blue"
          leftIcon={<Power size={18} color="white" />}
        />
      )}
      <Button
        title="Excluir anúncio"
        bgColor="gray.400"
        colorText="gray.100"
        leftIcon={<Trash size={18} color={colors.gray[100]} />}
      />
    </VStack>
  );
}
