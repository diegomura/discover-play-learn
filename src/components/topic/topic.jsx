import {
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
import classNames from 'classnames';

import useTheme from '%/hooks/use-theme';

import Source from './source';

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
      <div
        className={classNames(
          'absolute top-0 flex h-[63px] w-full items-center border-b pl-28',
          theme === 'dark'
            ? 'border-b-white bg-black'
            : 'border-b-neutral-300 bg-white'
        )}
      >
        <Heading as="h2" size="lg" flex={1}>
          {title}
        </Heading>

        <Button variant="ghost" margin={2} onClick={onOpen}>
          <Icon as={BiBook} w={8} h={8} />
        </Button>
      </div>

      <div className="flex h-screen flex-col pt-16">{children}</div>

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
