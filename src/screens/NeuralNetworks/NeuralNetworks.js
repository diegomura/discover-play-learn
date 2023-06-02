import React from 'react';
import { Box, Button, Flex, Stack } from '@chakra-ui/react';

import MLP from '../../engine/mlp';
import { createGradient } from '../../render/colors';

import Loss from './components/Loss';
import Topic from '../../components/Topic';
import NeuralNetwork from './components/NerualNetwork';
import ScatteredChart from './components/ScatteredChart';
import Point from './utils/Point';

const mlp = new MLP({ nin: 2, nouts: [4, 4, 1] });

const trainingData = [
  // center
  { value: [0, 0], expected: 0 },
  // top-left
  { value: [-1, 1], expected: -1 },
  { value: [-1, 9], expected: -1 },
  { value: [-2, 5], expected: -1 },
  { value: [-3, 7], expected: -1 },
  { value: [-4, 6], expected: -1 },
  { value: [-6, 8], expected: -1 },
  { value: [-7, 9], expected: -1 },
  { value: [-8, 6], expected: -1 },
  { value: [-9, 4], expected: -1 },
  { value: [-10, 3], expected: -1 },
  { value: [-6, 10], expected: -1 },
  { value: [-7, 12], expected: -1 },
  // top-right
  { value: [1, 1], expected: 1 },
  { value: [1, 9], expected: 1 },
  { value: [2, 5], expected: 1 },
  { value: [3, 7], expected: 1 },
  { value: [4, 6], expected: 1 },
  { value: [6, 8], expected: 1 },
  { value: [7, 9], expected: 1 },
  { value: [8, 6], expected: 1 },
  { value: [9, 4], expected: 1 },
  { value: [10, 3], expected: 1 },
  { value: [6, 10], expected: 1 },
  { value: [7, 12], expected: 1 },
  // bottom-left
  { value: [-1, -1], expected: 1 },
  { value: [-1, -9], expected: 1 },
  { value: [-2, -5], expected: 1 },
  { value: [-3, -7], expected: 1 },
  { value: [-4, -6], expected: 1 },
  { value: [-6, -8], expected: 1 },
  { value: [-7, -9], expected: 1 },
  { value: [-8, -6], expected: 1 },
  { value: [-9, -4], expected: 1 },
  { value: [-10, -3], expected: 1 },
  { value: [-6, -10], expected: 1 },
  { value: [-7, -12], expected: 1 },
  // bottom-right
  { value: [1, -1], expected: -1 },
  { value: [1, -9], expected: -1 },
  { value: [2, -5], expected: -1 },
  { value: [3, -7], expected: -1 },
  { value: [4, -6], expected: -1 },
  { value: [6, -8], expected: -1 },
  { value: [7, -9], expected: -1 },
  { value: [8, -6], expected: -1 },
  { value: [9, -4], expected: -1 },
  { value: [10, -3], expected: -1 },
  { value: [6, -10], expected: -1 },
  { value: [7, -12], expected: -1 },
];

const data = trainingData.map(({ value }) => value);
const expected = trainingData.map(({ expected }) => expected);

const gradient = createGradient({
  steps: ['#FF0000', '#FF0000', '#F0F0F0', '#0000FF', '#0000FF'],
  range: [-3, 3],
});

const testData = [...Array(1000).keys()].map(() => {
  const x = -10 + Math.random() * 20;
  const y = -10 + Math.random() * 20;
  return new Point({ x, y });
});

const NeuralNetworks = () => {
  const handleTrain = () => {
    let currentPass = 0;

    const { next } = mlp.train({ data, expected });

    const loop = () => {
      currentPass++;

      next();

      const step = Math.max(1, Math.abs(currentPass / 3));

      if (currentPass % step === 0) {
        testData.map(point => {
          const pred = mlp.call([point.x, point.y]);
          point.setColor(gradient.get(pred.data));
        });
      }

      if (currentPass <= 400) {
        requestAnimationFrame(loop);
      }
    };

    requestAnimationFrame(loop);
  };

  return (
    <Topic title="Neural Networks">
      <Flex
        w="100%"
        h="calc(100vh - 133px)"
        alignItems="center"
        justifyContent="center"
      >
        <NeuralNetwork h="100%" mlp={mlp} gradient={gradient} />

        <ScatteredChart
          width={300}
          height={300}
          style={{ height: '100%' }}
          points={testData}
        />
      </Flex>

      <Box
        h={70}
        borderTopWidth={1}
        borderTopStyle="solid"
        borderColor="lightGray"
      >
        <Stack direction="row">
          <Button onClick={handleTrain}>Train</Button>

          <Box>
            <Loss value={mlp.loss} />
          </Box>
        </Stack>
      </Box>
    </Topic>
  );
};

export default NeuralNetworks;
