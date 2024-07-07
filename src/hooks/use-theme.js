import { useColorMode } from '@chakra-ui/react';
import { useEffect } from 'react';

const useTheme = theme => {
  const { setColorMode } = useColorMode();

  useEffect(() => {
    setColorMode(theme);
  }, [theme, setColorMode]);
};

export default useTheme;
