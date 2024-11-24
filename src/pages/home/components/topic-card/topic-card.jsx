import { Link, Icon } from '@chakra-ui/react';

import Text from '%/components/text';

const TopicCard = ({ topic, href, icon }) => {
  const Wrapper = Link;

  return (
    <Wrapper
      href={href}
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.1)' }}
    >
      <div className="flex flex-col items-center p-5 shadow">
        <Icon as={icon} w={10} h={10} />
        <Text className="mt-4">{topic}</Text>
      </div>
    </Wrapper>
  );
};

export default TopicCard;
