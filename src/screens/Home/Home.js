import { SimpleGrid, Heading, Stack, Center, Text } from '@chakra-ui/react';
import {
  BiNetworkChart,
  BiQuestionMark,
  BiBarcode,
  BiPlanet,
} from 'react-icons/bi';

import useTheme from '../../hooks/useTheme';
import TopicCard from './components/TopicCard/TopicCard';

const Home = () => {
  useTheme('light');

  return (
    <Center h="100vh" axis="both">
      <Stack direction="column" align="center" maxW={700}>
        <Heading fontSize={60} mb={10}>
          Discover, Play, Learn
        </Heading>

        <Text align="center" mb={10}>
          The goal of this site is to serve as a personal (yet public)
          playground for exploring the topics I've been reading about and to
          have some fun, as well as a place to store references and perhaps some
          accompanying notes.
        </Text>

        <Text align="center" mb={10}>
          Don't expect anything on this site to make any sense! Topics may not
          even be related to each other or categorized within the field of
          Computer Science. I have no plans for it, and I might abandon it after
          a few days. Who knows what the future holds.
        </Text>

        <SimpleGrid columns={4} spacing={4}>
          <TopicCard
            topic="UTF-8 Encoding"
            icon={BiBarcode}
            href="/utf-8-encoding"
          />

          <TopicCard
            topic="Neural Networks"
            icon={BiNetworkChart}
            href="/neural-networks"
          />

          <TopicCard
            topic="Three Body"
            icon={BiPlanet}
            href="/three-body-problem"
          />

          <TopicCard
            topic="Other soon..."
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
