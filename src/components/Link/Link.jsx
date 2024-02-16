import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

const Link = ({ to, ...props }) => {
  const isExternal = to.includes('http');

  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      {...props}
      isExternal={isExternal}
    />
  );
};

export default Link;
