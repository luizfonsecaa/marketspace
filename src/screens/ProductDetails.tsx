import { Dimensions } from "react-native";
import { useState } from "react";
import {
  Money,
  QrCode,
  Barcode,
  CreditCard,
  Bank,
  WhatsappLogo,
} from "phosphor-react-native";
import {
  VStack,
  Image,
  HStack,
  Text,
  Divider,
  Avatar,
  Badge,
  Heading,
  useTheme,
} from "native-base";
import Carousel from "react-native-reanimated-carousel";
import { Button } from "@components/Button";
import { Header } from "@components/Header";

export function ProductDetails() {
  const width = Dimensions.get("window").width;
  const { colors } = useTheme();

  const [currentImages, setCurrentImages] = useState(0);
  const [productImages, setProductImagens] = useState([
    {
      url: "https://cdn.awsli.com.br/600x450/2272/2272002/produto/184216964d70d1121a5.jpg",
      index: 1,
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQEY7wLm40beKGs-gP6gu4sD3zHkFKnna_9Ed3i2kyQSPujSNWoBWfLzA8KzMSUZkPJKyDTbsl8nIMPWzaFvIpUxkL4avpBdOVtOMD4UOk&usqp=CAE",
      index: 2,
    },
  ]);

  return (
    <>
      <Header type="basic" />
      <VStack flex={1} bgColor="gray.600">
        <Carousel
          loop
          width={width}
          height={230}
          data={productImages}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => setCurrentImages(index)}
          pagingEnabled
          autoPlay={false}
          snapEnabled
          renderItem={({ item }) => (
            <Image
              h="full"
              resizeMode="cover"
              alt="Product Image"
              source={{
                uri: item.url,
              }}
            />
          )}
        />
        <HStack ml={1} mt={-2}>
          {productImages.map((item, index) => (
            <HStack flex={1} mr={2}>
              <Divider
                h={1}
                _light={{
                  bg: index == currentImages ? "gray.100" : "gray.700",
                }}
              />
            </HStack>
          ))}
        </HStack>
        <HStack px={5} pt={5} alignItems="center">
          <Avatar
            bg="green.500"
            alignSelf="center"
            borderColor="blue_light"
            borderWidth={2}
            size={9}
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          ></Avatar>
          <Text ml={2}>Luiz Otavio</Text>
        </HStack>
        <HStack p={5}>
          <Badge bgColor="gray.500" borderRadius="full">
            <Text
              color="gray.200"
              fontWeight="bold"
              fontFamily="heading"
              fontSize={10}
            >
              NOVO
            </Text>
          </Badge>
        </HStack>
        <HStack px={5} justifyContent="space-between">
          <Heading fontWeight="bold">Bicicleta</Heading>
          <HStack alignItems="flex-end">
            <Text color="blue_light">R$</Text>
            <Heading color="blue_light">120,00</Heading>
          </HStack>
        </HStack>
        <Text px={5} pt={2}>
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu.
          Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet
          nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis
          in aliquam.
        </Text>

        <HStack px={5} pt={8}>
          <Text pr={2} fontWeight="bold" fontFamily="heading">
            Aceita troca?
          </Text>
          <Text>Sim</Text>
        </HStack>

        <VStack px={5} mt={3}>
          <Text pr={2} mb={2} fontWeight="bold" fontFamily="heading">
            Meios de pagamento:
          </Text>
          <HStack alignItems="center">
            <Barcode size={18} />
            <Text ml={1}>Boleto</Text>
          </HStack>
          <HStack alignItems="center">
            <QrCode size={18} />
            <Text ml={1}>Pix</Text>
          </HStack>
          <HStack alignItems="center">
            <Money size={18} />
            <Text ml={1}>Dinheiro</Text>
          </HStack>
          <HStack alignItems="center">
            <CreditCard size={18} />
            <Text ml={1}>Cartão de credito</Text>
          </HStack>
          <HStack alignItems="center">
            <Bank size={18} />
            <Text ml={1}>Deposito bancario</Text>
          </HStack>
        </VStack>
      </VStack>
      <HStack px={5} py={6} justifyContent="space-between" alignItems="center">
        <HStack alignItems="flex-end">
          <Text fontSize="lg" color="blue">
            R$
          </Text>
          <Heading fontSize="3xl" color="blue">
            120,00
          </Heading>
        </HStack>
        <Button
          w="1/2"
          bgColor="blue"
          title="Entrar em contato"
          leftIcon={<WhatsappLogo weight="fill" size={18} color="white" />}
        />
      </HStack>
    </>
  );
}
