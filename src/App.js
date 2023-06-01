import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme';
import Screens from './screens';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Screens />
    </ChakraProvider>
  );
};

export default App;
