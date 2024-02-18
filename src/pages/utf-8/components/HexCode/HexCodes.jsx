import { Text } from '@chakra-ui/react';

const toHex = code => {
  return code.toString(16).toUpperCase().padStart(2, '0');
};

const HexCode = ({ value }) => {
  return (
    <Text as="span" mr={1} ml={1} fontWeight={500}>
      0x{toHex(value)}
    </Text>
  );
};

export default HexCode;
