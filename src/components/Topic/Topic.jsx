import {
  Flex,
  Heading,
  Button,
  Icon,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { BiBook } from 'react-icons/bi';

import Source from './Source';
import useTheme from '../../hooks/useTheme';

const Topic = ({
  title,
  theme = 'light',
  sources = [],
  documentation,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useTheme(theme);

  const drawerSize = documentation ? 'xl' : 'sm';

  const drawerTitle = documentation ? 'Documentation' : 'Sources';

  return (
    <>
      <Flex
        h={63}
        w="100%"
        top={0}
        position="absolute"
        paddingLeft={105}
        borderBottomWidth={1}
        borderBottomStyle="solid"
        borderColor="lightGray"
        alignItems="center"
        backgroundColor={theme === 'dark' ? 'black' : 'white'}
      >
        <Heading as="h2" size="lg" flex={1}>
          {title}
        </Heading>

        <Button variant="ghost" margin={2} onClick={onOpen}>
          <Icon as={BiBook} w={8} h={8} />
        </Button>
      </Flex>

      <Flex pt={63} h="100vh" flexDirection="column">
        {children}
      </Flex>

      <Drawer
        placement="right"
        size={drawerSize}
        onClose={onClose}
        isOpen={isOpen}
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">{drawerTitle}</DrawerHeader>

          <DrawerBody>
            <Stack direction="column">
              {sources.map(source => (
                <Source key={source.link} {...source} />
              ))}

              {documentation && (
                <div className="markdown">
                  <documentation.ReactComponent />
                </div>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Topic;
