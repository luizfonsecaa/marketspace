import { useNavigation } from '@react-navigation/native'
import { Box, Heading, HStack, Pressable } from 'native-base'
import { ArrowLeft } from 'phosphor-react-native'

type Props = {
  name: string
}

export function Basic({ name }: Props) {
  const navigation = useNavigation()
  return (
    <HStack mt={20} mb={7} alignItems="center" justifyContent="center">
      <Box position="absolute" left={5}>
        <Pressable onPress={() => navigation.goBack()}>
          <ArrowLeft />
        </Pressable>
      </Box>
      {name && <Heading fontSize="lg">{name}</Heading>}
    </HStack>
  )
}
