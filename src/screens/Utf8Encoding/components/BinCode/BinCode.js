import { Text } from '@chakra-ui/react';
import React from 'react';

const toBin = code => {
  return code.toString(2).toUpperCase().padStart(8, '0');
};

const getDimChars = (index, of) => {
  if (of === 1) return 0;

  if (of === 2) return index === 0 ? 3 : 2;

  if (of === 3) return index === 0 ? 4 : 2;

  return index === 0 ? 5 : 2;
};

const BinCode = ({ value, index, of }) => {
  const dimChars = getDimChars(index, of);
  const bin = toBin(value);
  const left = bin.slice(0, dimChars);
  const right = bin.slice(dimChars + 1);

  return (
    <Text as="span" mr={1} ml={1} fontWeight={500}>
      <Text as="span" opacity={0.4}>
        {left}
      </Text>
      <Text as="span">{right}</Text>
    </Text>
  );
};

export default BinCode;
