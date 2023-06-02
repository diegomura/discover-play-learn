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
        backgroundColor="white"
      >
        <Heading as="h2" size="lg" flex={1}>
          {title}
        </Heading>

        <Button variant="ghost" color="black" margin={2} onClick={onOpen}>
          <Icon as={BiBook} w={8} h={8} />
        </Button>
      </Flex>

      <Flex pt={63} h="100vh" flexDirection="column">
        {children}
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
