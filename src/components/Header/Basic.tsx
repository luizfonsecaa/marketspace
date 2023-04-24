import { Box, Heading, HStack } from "native-base";
import { ArrowLeft } from "phosphor-react-native";

type Props = {
  name: string;
};

export function Basic({ name }: Props) {
  return (
    <HStack mt={20} mb={7} alignItems="center" justifyContent="center">
      <Box position="absolute" left={5}>
        <ArrowLeft />
      </Box>
      {name && <Heading fontSize="lg">{name}</Heading>}
    </HStack>
  );
}
