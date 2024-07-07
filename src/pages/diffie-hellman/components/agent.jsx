import { useEffect, useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { capitalize } from 'lodash';

const Agent = ({ agent, hidden }) => {
  const [state, setState] = useState({});

  useEffect(() => agent.observe(setState), [agent]);

  return (
    <Flex w={250} h={350} direction="column" alignItems="center">
      <Text fontSize="lg" fontWeight={500} mb="20px">
        {capitalize(agent.name)}
      </Text>

      <Flex w="100%" flex="1" border="2px solid #8e8e8e" borderRadius={10}>
        <Flex p="16px" direction="column" filter={hidden ? 'blur(5px)' : ''}>
          <Text fontWeight={600}>Initial State:</Text>
          <Text color="gray.500">Secret: {state.secret}</Text>

          {state.prime && (
            <>
              <Text mt="16px" fontWeight={600}>
                Public Parameters:
              </Text>
              <Text color="gray.500">Prime: {state.prime}</Text>
              <Text color="gray.500">Root Modulo: {state.rootModulo}</Text>
            </>
          )}

          {state.ownPartialSecret && (
            <>
              <Text mt="16px" fontWeight={600}>
                Patial Secrets:
              </Text>
              <Text color="gray.500">Own: {state.ownPartialSecret}</Text>
              <Text color="gray.500">
                Other: {state.otherPartialSecret || '-'}
              </Text>
            </>
          )}

          {state.sharedKey && (
            <Text mt="16px" fontWeight={700} color="green.500">
              Shared Key: {state.sharedKey}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Agent;
