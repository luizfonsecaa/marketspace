import {
  Avatar,
  Badge,
  Heading,
  Pressable,
  VStack,
  Image,
  Text,
  Box,
} from 'native-base'

type Props = {
  isAvatar?: boolean
  disable?: boolean
}

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
            uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
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
            uri: 'data:image/jpeg;base64,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',
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
              style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
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
        <Text color={disable ? 'gray.400' : 'gray.100'} fontSize="md">
          Tênis vermelho
        </Text>
        <Heading color={disable ? 'gray.400' : 'gray.100'} fontSize="xl">
          R$ 59,90
        </Heading>
      </VStack>
    </Pressable>
  )
}
{
}
