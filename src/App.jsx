import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './theme';
import Pages from './pages';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Pages />
    </ChakraProvider>
  );
};

export default App;
