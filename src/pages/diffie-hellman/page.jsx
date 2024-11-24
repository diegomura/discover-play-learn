import { useState } from 'react';
import { Box, Button, Flex, HStack } from '@chakra-ui/react';

import create from '#/diffie-hellman';

import Agent from './components/agent';
import Channel from './components/channel';

const { network, simulator } = create();

const DiffieHellman = () => {
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => setHidden(value => !value);

  return (
    <>
      <Flex
        w="100%"
        h="calc(100vh - 133px)"
        alignItems="center"
        justifyContent="center"
      >
        <HStack spacing="20px">
          <Agent agent={network.alice} hidden={hidden} />

          <Channel channel={network.channel} />

          <Agent agent={network.bob} hidden={hidden} />
        </HStack>
      </Flex>

      <Box
        h={70}
        display="flex"
        borderTopWidth={1}
        borderTopStyle="solid"
        borderColor="lightGray"
        alignItems="center"
        justifyContent="flex-end"
        paddingRight={5}
        paddingLeft={5}
      >
        <Button marginLeft={5} onClick={toggleHidden}>
          {hidden ? 'Show' : 'Hide'}
        </Button>

        <Button marginLeft={5} onClick={simulator.next}>
          Next
        </Button>
      </Box>
    </>
  );
};

export default DiffieHellman;
