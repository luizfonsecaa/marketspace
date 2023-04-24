import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";
import { useState } from "react";

import { Divider, HStack, Image } from "native-base";

export function ImageDetails() {
  const width = Dimensions.get("window").width;

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
    </>
  );
}
