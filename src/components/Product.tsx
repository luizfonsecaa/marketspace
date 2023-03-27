import {
  Avatar,
  Badge,
  Heading,
  Pressable,
  VStack,
  Image,
  Text,
  Box,
} from "native-base";

type Props = {
  isAvatar?: boolean;
  disable?: boolean;
};

export function Product({ isAvatar = true, disable = false }: Props) {
  return (
    <Pressable w="47%" mb={4} borderRadius={10} overflow="hidden">
      {isAvatar && (
        <Avatar
          position="absolute"
          zIndex={1}
          left={2}
          top={2}
          size={10}
          borderColor="white"
          borderWidth={1}
          bg="green.500"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        >
          AJ
        </Avatar>
      )}
      <Badge
        bgColor="gray.200"
        px={3}
        position="absolute"
        zIndex={1}
        right={2}
        top={2}
        borderRadius="full"
      >
        <Text
          color="white"
          fontWeight="bold"
          fontFamily="heading"
          fontSize="sm"
        >
          USADO
        </Text>
      </Badge>

      <VStack position="static" borderRadius={10}>
        <Image
          borderRadius={10}
          size="xl"
          alt="Product Image"
          w="full"
          source={{
            uri: "https://secure-static.vans.com.br/medias/sys_master/vans/vans/h72/ha7/h00/h00/9592309022750/1002001070011U-01-BASEIMAGE-Hires.jpg",
          }}
        />
        {disable && (
          <>
            <VStack
              borderRadius={10}
              bg="blueGray.100"
              w="full"
              h="full"
              position="absolute"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            ></VStack>
            <Box position="absolute" zIndex={1} bottom={1}>
              <Text ml={2} color="white" fontSize="xs">
                ANÚNCIO DESATIVADO
              </Text>
            </Box>
          </>
        )}
      </VStack>

      <VStack pt={1}>
        <Text color={disable ? "gray.400" : "gray.100"} fontSize="md">
          Tênis vermelho
        </Text>
        <Heading color={disable ? "gray.400" : "gray.100"} fontSize="xl">
          R$ 59,90
        </Heading>
      </VStack>
    </Pressable>
  );
}
{
}
