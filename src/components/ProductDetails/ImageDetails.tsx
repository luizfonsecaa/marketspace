import Carousel from 'react-native-reanimated-carousel'
import { Dimensions } from 'react-native'
import { useState } from 'react'

import { Divider, HStack, Image } from 'native-base'
import { API_URL } from '@env'

type Props = {
  images: { name: string; uri: string; type: string }[]
}

export function ImageDetails({ images }: Props) {
  const width = Dimensions.get('window').width
  const [currentImages, setCurrentImages] = useState(0)
  return (
    <>
      <Carousel
        loop
        width={width}
        height={230}
        data={images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentImages(index)}
        pagingEnabled
        autoPlay={false}
        snapEnabled
        renderItem={({ item, index }) => (
          <Image
            key={index}
            h="full"
            resizeMode="cover"
            alt="Product Image"
            source={{
              uri: item.uri ? item.uri : `${API_URL}images/${item.path}`,
            }}
          />
        )}
      />
      <HStack ml={1} mt={-2}>
        {images?.map((item, index) => (
          <HStack key={index} flex={1} mr={2}>
            <Divider
              h={1}
              _light={{
                bg: index == currentImages ? 'gray.100' : 'gray.700',
              }}
            />
          </HStack>
        ))}
      </HStack>
    </>
  )
}
