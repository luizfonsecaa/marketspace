import {
  Input as NativeBaseInput,
  IInputProps,
  FormControl,
  Text,
} from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        minH={12}
        borderWidth={0}
        fontSize="md"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'gray.500',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>
        <Text color="error.700" mt={1}>
          {errorMessage}
        </Text>
      </FormControl.ErrorMessage>
    </FormControl>
  )
}
