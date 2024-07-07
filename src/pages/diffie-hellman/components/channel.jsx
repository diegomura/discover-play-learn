import { useEffect, useState } from 'react';
import { Flex, Text, VStack } from '@chakra-ui/react';
import Message from './message';

const Channel = ({ channel }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleMessage = message => {
      setMessages(messages => [...messages, message]);
    };

    channel.on(handleMessage);

    return () => channel.off(handleMessage);
  }, [channel]);

  return (
    <Flex w={400} h={350} direction="column" alignItems="center">
      <Text fontSize="lg" fontWeight={500} mb="10px">
        Public Channel
      </Text>

      <VStack w="100%" flex="1">
        {messages.length === 0 && (
          <Text fontSize="small" color="gray.500" mt="32px" align="center">
            No messages.
            <br />
            Click on Next to start the simulation.
          </Text>
        )}

        {messages.map((message, index) => (
          <Message key={index} from={message.from} message={message.message} />
        ))}
      </VStack>
    </Flex>
  );
};

export default Channel;
