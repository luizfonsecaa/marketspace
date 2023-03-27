import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import {
  Heading,
  VStack,
  Text,
  Radio,
  Stack,
  HStack,
  Box,
  Switch,
  Checkbox,
  ScrollView,
} from "native-base";
import { useState } from "react";

export function NewAds() {
  const [value, setValue] = useState("one");
  const [troca, setTroca] = useState(true);
  const [groupValues, setGroupValues] = useState([]);
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
            setValue(nextValue);
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
            setGroupValues(values || []);
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
  );
}
