import { Flex, Text } from '@chakra-ui/react';
import Arrow from './arrow';

const COLORS = {
  channel: '#8e8e8e',
  alice: '#e54343',
  bob: '#4373e5',
};

const Message = ({ from, message }) => {
  const color = COLORS[from];
  const { type, value } = message;

  let text;
  if (type === 'public_parameters') {
    text = `Public Parameters - prime(${value.prime}), rootModulo(${value.rootModulo})`;
  } else if (type === 'partial_secret') {
    text = `Partial Secret - ${value}`;
  }

  return (
    <Flex direction="column" w="100%" align="center" mt="15px">
      <Text color={color} fontWeight={600} fontSize="small">
        {text}
      </Text>

      <Arrow
        left={from === 'channel' || from === 'bob'}
        right={from === 'channel' || from === 'alice'}
        color={color}
      />
    </Flex>
  );
};

export default Message;
