import { Avatar, HStack, Text } from "native-base";

export function AvatarName() {
  return (
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
  );
}
