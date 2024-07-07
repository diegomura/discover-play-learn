import { Text, Icon, Flex } from '@chakra-ui/react';
import { BiVideo, BiLink } from 'react-icons/bi';

import Link from '../link';

const IconTypes = {
  video: BiVideo,
};

const Source = ({ title, author, link, type }) => {
  const SourceIcon = IconTypes[type] || BiLink;

  return (
    <Flex mb={4}>
      <Icon as={SourceIcon} w={6} h={6} mr={4} />

      <Link to={link}>
        <Text as="span" fontWeight="bold">
          {title}
        </Text>{' '}
        by <Text as="span">{author}</Text>
      </Link>
    </Flex>
  );
};

export default Source;
