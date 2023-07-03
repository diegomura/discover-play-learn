import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './theme';
import Screens from './screens';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Screens />
    </ChakraProvider>
  );
};

export default App;
