import {
  Flex,
  Heading,
  Button,
  Icon,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { BiBook } from 'react-icons/bi';

const Topic = ({ title, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex flexDirection="column">
        <Flex
          h={63}
          paddingLeft={105}
          borderBottomWidth={1}
          borderBottomStyle="solid"
          borderColor="lightGray"
          alignItems="center"
        >
          <Heading as="h2" size="lg" flex={1}>
            {title}
          </Heading>

          <Button variant="ghost" color="black" margin={2} onClick={onOpen}>
            <Icon as={BiBook} w={8} h={8} />
          </Button>
        </Flex>

        <Flex flex={1}>{children}</Flex>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />

        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Sources</DrawerHeader>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Topic;
