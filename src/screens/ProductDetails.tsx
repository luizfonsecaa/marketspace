import { VStack, HStack, Text, ScrollView } from "native-base";

import { Header } from "@components/Header";
import { AvatarName } from "@components/ProductDetails/AvatarName";
import { Badge } from "@components/Badge";
import { PaymentMethod } from "@components/ProductDetails/PaymentMethod";
import { ImageDetails } from "@components/ProductDetails/ImageDetails";
import { ProductHeaderDetails } from "@components/ProductDetails/ProductHeaderDetails";
import { AcceptExchange } from "@components/ProductDetails/AcceptExchange";
import { FooterAdminPreview } from "@components/ProductDetails/FooterAdminPreview";
import { FooterDetails } from "@components/ProductDetails/FooterDetails";
import { FooterPreview } from "@components/ProductDetails/FooterPreview";

const about =
  "Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus ametnibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculisin aliquam.";

export function ProductDetails() {
  return (
    <ScrollView>
      <Header type="preview" />
      <ImageDetails />
      <VStack flex={1} bgColor="gray.600">
        <AvatarName />
        <HStack p={5}>
          <Badge title="Novo" size={10} />
        </HStack>

        <ProductHeaderDetails title="Luminária pendente" price="45,00" />

        <Text px={5} pt={2}>
          {about}
        </Text>

        <AcceptExchange isChange={true} />
        <PaymentMethod />

        {/* <FooterAdminPreview active={true} /> */}
      </VStack>
      {/* <FooterDetails /> */}
      {/* <FooterPreview /> */}
    </ScrollView>
  );
}
