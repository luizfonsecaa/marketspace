import { Badge as BadgeNativeBase, Text } from "native-base";

type Props = {
  title: string;
  size: number;
};

export function Badge({ title, size }: Props) {
  return (
    <BadgeNativeBase bgColor="gray.500" borderRadius="full">
      <Text
        color="gray.200"
        fontWeight="bold"
        fontFamily="heading"
        fontSize={size}
      >
        {title}
      </Text>
    </BadgeNativeBase>
  );
}
