import { useNavigation } from '@react-navigation/native'
import { AppNavigationRoutesProps } from '@routes/app.routes'
import { HStack, Heading, VStack, Text, useTheme } from 'native-base'
import { Tag, ArrowRight } from 'phosphor-react-native'
import { Pressable } from 'react-native'
export function CardMyAdds() {
  const { colors } = useTheme()
  const navigation = useNavigation<AppNavigationRoutesProps>()
  return (
    <Pressable onPress={() => navigation.navigate('ads')}>
      <HStack
        bgColor="lightBlue.100"
        p={3}
        borderRadius={8}
        justifyContent="space-between"
        alignItems="center"
      >
        <HStack alignItems="center">
          <Tag size={24} color={colors.blue} />
          <VStack ml={2}>
            <Heading fontWeight="bold" fontSize="lg">
              4
            </Heading>
            <Text color="gray.200">anúncios ativos</Text>
          </VStack>
        </HStack>
        <HStack>
          <Text mr={4} fontWeight="bold" color="blue">
            Meus anúncios
          </Text>
          <ArrowRight size={24} color={colors.blue} />
        </HStack>
      </HStack>
    </Pressable>
  )
}
