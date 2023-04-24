import { Button } from '@components/Button'
import { Header } from '@components/Header'
import { Input } from '@components/Input'
import {
  Heading,
  VStack,
  Text,
  Radio,
  Stack,
  HStack,
  Switch,
  Checkbox,
  ScrollView,
  Pressable,
  useToast,
  Image,
} from 'native-base'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { Plus } from 'phosphor-react-native'

export function NewAds() {
  const [value, setValue] = useState('one')
  const [troca, setTroca] = useState(true)
  const [groupValues, setGroupValues] = useState([])
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [photoProduct, setPhotoProduct] = useState<
    { name: string; uri: string; type: string }[]
  >([])
  const toast = useToast()

  async function handleUserPhotoSelect() {
    try {
      setPhotoIsLoading(true)
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        allowsMultipleSelection: false,
        selectionLimit: 3,
      })

      if (photoSelected.canceled) return

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        )

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 15) {
          return toast.show({
            title: 'Essa Imagem é muito grande. Escolha uma de ate 5MB',
            placement: 'top',
            bgColor: 'red.500',
          })
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop()

        setPhotoProduct((e) => [
          ...e,
          {
            name: `${new Date().getUTCMilliseconds()}`,
            uri: photoSelected.assets[0].uri,
            type: `${photoSelected.assets[0].type}/${fileExtension}`,
          },
        ])

        console.log(photoProduct)

        toast.show({
          title: 'Foto atializada',
          placement: 'bottom',
          bgColor: 'green.500',
        })
      }
    } catch (error) {
    } finally {
      setPhotoIsLoading(false)
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={6} bgColor="gray.600">
        <Header type="basic" name="Criar Anúncios" />
        <Heading color="gray2" fontSize="md">
          Imagens
        </Heading>
        <Text color="gray.300" mb={42}>
          Escolha até 3 imagens para mostrar o quando o seu produto é incrível!
        </Text>

        <HStack>
          <HStack
            w="24"
            h="24"
            bgColor="gray.500"
            borderRadius={10}
            justifyContent="center"
            alignItems="center"
          >
            <Pressable onPress={handleUserPhotoSelect}>
              <Plus />
            </Pressable>
          </HStack>
          {photoProduct.map((e) => (
            <Image
              key={e.name}
              h="full"
              resizeMode="cover"
              alt="Product Image"
              source={{
                uri: e.uri,
              }}
            />
          ))}
        </HStack>

        <Heading color="gray2" fontSize="md" mt={68} mb={4}>
          Sobre o produto
        </Heading>
        <Input placeholder="Titulo do anúncio" borderRadius="lg" />
        <Input
          placeholder="Descrição do produto"
          borderRadius="lg"
          multiline={true}
          numberOfLines={10}
          h={150}
        />
        <Radio.Group
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue) => {
            setValue(nextValue)
          }}
        >
          <HStack w="full">
            <Stack direction="row" w="full" space={4}>
              <Radio value="one" my={1}>
                Produto novo
              </Radio>
              <Radio value="two" my={1}>
                Produto usado
              </Radio>
            </Stack>
          </HStack>
        </Radio.Group>
        <Heading color="gray2" fontSize="md" mt={8} mb={4}>
          Venda
        </Heading>
        <Input
          placeholder="Valor"
          borderRadius="lg"
          InputLeftElement={
            <Text fontSize="md" ml={5}>
              R$
            </Text>
          }
        />
        <Heading color="gray2" fontSize="md" mt={2} mb={2}>
          Aceita troca?
        </Heading>
        <Switch value={troca} size="md" onToggle={(e) => setTroca(e)} />
        <Heading color="gray2" fontSize="md" mt={5} mb={1}>
          Meios de pagamento aceitos
        </Heading>
        <Checkbox.Group
          onChange={(values) => {
            setGroupValues(values || [])
          }}
          value={groupValues}
          accessibilityLabel="choose numbers"
        >
          <Checkbox value="1" my={2}>
            UX Research
          </Checkbox>
          <Checkbox value="2">Software Development</Checkbox>
          <Checkbox value="3" my={2}>
            Software Development
          </Checkbox>
        </Checkbox.Group>
      </VStack>
      <HStack flex={1} px={6} pt={6} pb={10}>
        <Button
          w="1/2"
          mr={1}
          title="Cancelar"
          bgColor="gray.400"
          colorText="gray.100"
        />
        <Button w="1/2" ml={1} title="Avançar" bgColor="gray.100" />
      </HStack>
    </ScrollView>
  )
}
