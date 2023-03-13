
import { Dimensions, Text, View } from 'react-native';
import * as React from 'react';
import Carousel from 'react-native-reanimated-carousel';


export function ProductDetails() {
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        pagingEnabled
        autoPlay={true}
        snapEnabled
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            <Text style={{ textAlign: 'center', fontSize: 30 }}>
              {index}
            </Text>
          </View>
        )}
      />
    </View>
  );
}