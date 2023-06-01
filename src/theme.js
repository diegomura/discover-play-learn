import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
};

const theme = extendTheme({
  colors: {
    primary: '#FFFFFF',
    background: '#EFE1D3',
    foreground: '#333333',
    lighterForeground: 'rgba(51, 51, 51, 0.2)',
  },
  color: 'foreground',
  breakpoints,
});

export default theme;
