import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { BiMenu } from 'react-icons/bi';

import Link from '../../components/Link';

const Root = () => {
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => onClose(), [location]);

  return (
    <main>
      <Button
        position="absolute"
        top={1}
        left={0}
        variant="ghost"
        color="black"
        margin={2}
        onClick={onOpen}
      >
        <Icon as={BiMenu} w={8} h={8} />
      </Button>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>

          <DrawerBody>
            <Stack direction="column">
              <Link to={`/`}>Home</Link>
              <Link to={`/neural-networks`}>Neural Networks</Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Outlet />
    </main>
  );
};

export default Root;
