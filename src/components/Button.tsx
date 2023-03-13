import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';
import { Plus } from 'phosphor-react-native';

type Props = IButtonProps & {
  title: string;
  colorText?: string;
}

export function Button({ title, colorText = 'white', ...rest }: Props) {
  return (
    <ButtonNativeBase
      w="full"
      h={12}
      borderWidth={0}
      rounded="sm"
      {...rest}
    >
      <Text
        color={colorText}
        fontFamily="heading"
        fontSize="sm"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
}