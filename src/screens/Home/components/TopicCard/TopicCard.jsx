import { Box, Link, Text, Card, CardBody, Icon } from '@chakra-ui/react';

const TopicCard = ({ topic, href, icon, disabled }) => {
  const Wrapper = disabled ? Box : Link;

  return (
    <Wrapper
      href={href}
      opacity={disabled ? 0.4 : 1}
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.1)' }}
    >
      <Card>
        <CardBody align="center">
          <Icon as={icon} w={10} h={10} mb={2} />
          <Text>{topic}</Text>
        </CardBody>
      </Card>
    </Wrapper>
  );
};

export default TopicCard;
