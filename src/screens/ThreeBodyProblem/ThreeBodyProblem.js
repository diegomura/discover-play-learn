import React, { useEffect, useRef } from 'react';

import { Flex } from '@chakra-ui/react';

import sources from './sources';
import Topic from '../../components/Topic';
import run from '../../modules/three-body';

const ThreeBodyProblem = () => {
  const ref = useRef(null);

  useEffect(() => {
    run(ref.current);
  }, []);

  return (
    <Topic title="Three Body Problem" sources={sources}>
      <Flex
        w="100%"
        h="calc(100vh - 210px)"
        alignItems="center"
        justifyContent="center"
      >
        <canvas ref={ref} id="canvas" width={800} height={450} />
      </Flex>

      <Flex
        h={40}
        borderTopWidth={1}
        borderTopStyle="solid"
        borderColor="lightGray"
      ></Flex>
    </Topic>
  );
};

export default ThreeBodyProblem;
