import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

const Link = ({ href, ...props }) => {
  return <ChakraLink as={ReactRouterLink} href={href} {...props} />;
};

export default Link;
