import { StatusBar } from "react-native";
import { NativeBaseProvider, Box, VStack, Text } from "native-base";
import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from "@expo-google-fonts/karla";

import { SignIn } from "@screens/SignIn";
import { SignUp } from "@screens/SignUp";
import { Loading } from "@components/Loading";
import { THEME } from "./src/theme";
import { Home } from "@screens/Home";
import { ProductDetails } from "@screens/ProductDetails";
import { Ads } from "@screens/Ads";
import { NewAds } from "@screens/NewAds";
export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <NewAds /> : <Loading />}
    </NativeBaseProvider>
  );
}
