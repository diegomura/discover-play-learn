import { Icon } from '@chakra-ui/react';
import { BiVideo, BiLink } from 'react-icons/bi';

import Link from '../link';
import Text from '../text';

const IconTypes = {
  video: BiVideo,
};

const Source = ({ title, author, link, type }) => {
  const SourceIcon = IconTypes[type] || BiLink;

  return (
    <div className="mb-4 flex">
      <Icon as={SourceIcon} w={6} h={6} mr={4} />

      <Link to={link}>
        <Text as="span" className="font-bold">
          {title}
        </Text>{' '}
        by <Text as="span">{author}</Text>
      </Link>
    </div>
  );
};

export default Source;
