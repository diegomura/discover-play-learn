import { SimpleGrid, Heading, Stack, Center, Text } from '@chakra-ui/react';
import { BiNetworkChart, BiQuestionMark } from 'react-icons/bi';
import TopicCard from './components/TopicCard/TopicCard';

const Home = () => {
  return (
    <Center h="100vh" axis="both">
      <Stack direction="column" align="center" maxW={700}>
        <Heading fontSize={60} mb={10}>
          AI Learning!
        </Heading>

        <Text align="center" mb={4}>
          Okay. It's finally time to delve into AI.
        </Text>
        <Text align="center" mb={4}>
          Studying this topic has been on my list for a long time, and let's be
          honest, I might give up soon after starting. But let's at least give
          it a try :)
        </Text>
        <Text align="center" mb={10}>
          The goal of this site is to serve as a personal (yet public)
          playground for exploring the topics I've been reading about and to
          have some fun, as well as a place to store references and perhaps some
          accompanying notes.
        </Text>
        <SimpleGrid columns={4} spacing={4}>
          <TopicCard
            topic="Neural Networks"
            icon={BiNetworkChart}
            href="/neural-networks"
          />

          <TopicCard
            topic="Other soon.."
            icon={BiQuestionMark}
            href="/"
            disabled
          />

          <TopicCard
            topic="Maybe not..."
            icon={BiQuestionMark}
            href="/"
            disabled
          />

          <TopicCard
            topic="Who knows?"
            icon={BiQuestionMark}
            href="/"
            disabled
          />
        </SimpleGrid>
      </Stack>
    </Center>
  );
};

export default Home;
