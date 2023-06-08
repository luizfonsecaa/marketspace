import { Divider, HStack, Pressable } from 'native-base'
import { MagnifyingGlass, Sliders } from 'phosphor-react-native'
import { Input } from '@components/Input'

type Props = {
  open: () => void
}

export function Search({ open }: Props) {
  return (
    <Input
      placeholder="Buscar anúncio"
      mb={6}
      InputRightElement={
        <HStack>
          <Pressable>
            <MagnifyingGlass />
          </Pressable>
          <Divider orientation="vertical" mx={2} h={6} bgColor="gray.400" />
          <Pressable mr={2} onPress={open}>
            <Sliders />
          </Pressable>
        </HStack>
      }
    />
  )
}
