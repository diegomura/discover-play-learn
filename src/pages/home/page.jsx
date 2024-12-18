/* eslint-disable react/no-unescaped-entities */

import { SimpleGrid, Heading, Stack } from '@chakra-ui/react';
import {
  BiNetworkChart,
  BiSolidKey,
  BiBarcode,
  BiPlanet,
  BiCode,
} from 'react-icons/bi';

import Text from '%/components/text';
import useTheme from '%/hooks/use-theme';

import TopicCard from './components/topic-card';

const Home = () => {
  useTheme('light');

  return (
    <div className="flex h-screen items-center justify-center">
      <Stack direction="column" align="center" maxW={700}>
        <Heading fontSize={60} mb={10}>
          Discover, Play, Learn
        </Heading>

        <Text className="mb-10 text-center">
          The goal of this site is to serve as a personal (yet public)
          playground for exploring the topics I've been reading about and to
          have some fun, as well as a place to store references and perhaps some
          accompanying notes.
        </Text>

        <Text className="mb-10 text-center">
          Don't expect anything on this site to make any sense! Topics may not
          even be related to each other or categorized within the field of
          Computer Science. I have no plans for it, and I might abandon it after
          a few days. Who knows what the future holds.
        </Text>

        <SimpleGrid columns={4} spacing={4}>
          <TopicCard topic="UTF-8 Encoding" icon={BiBarcode} href="/utf-8" />

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
            topic="Diffie-Hellman"
            icon={BiSolidKey}
            href="/diffie-hellman"
          />

          <TopicCard
            topic="Huffman Coding"
            icon={BiCode}
            href="/huffman-coding"
          />
        </SimpleGrid>
      </Stack>
    </div>
  );
};

export default Home;
