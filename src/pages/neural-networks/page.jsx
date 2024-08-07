import { Box, Button, Flex } from '@chakra-ui/react';

import MLP from '#/neural-networks/engine/mlp';
import { createGradient } from '#/neural-networks/render/colors';

import Loss from './components/loss';
import NeuralNetwork from './components/neural-network';
import ScatteredChart from './components/scattered-chart';

const mlp = new MLP({ nin: 2, nouts: [3, 4, 1] });

const trainingData = [
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

const resolution = 0.4;
const xAxis = [-10, 10];
const yAxis = [-10, 10];
const testData = [];

for (let x = xAxis[0] - 1; x <= xAxis[1] + 1; x += resolution) {
  for (let y = yAxis[0] - 1; y <= yAxis[1] + 1; y += resolution) {
    testData.push({ x, y });
  }
}

const NeuralNetworks = () => {
  const handleTrain = () => {
    let currentPass = 0;

    const { next } = mlp.train({ data, expected });

    const loop = () => {
      currentPass++;

      next();

      const step = Math.max(1, Math.abs(currentPass / 3));

      if (currentPass % step === 0) {
        testData.forEach(point => {
          const pred = mlp.call([point.x, point.y]);
          const color = gradient.get(pred.data);

          point.color = color;
        });
      }

      if (currentPass <= 400) {
        requestAnimationFrame(loop);
      }
    };

    requestAnimationFrame(loop);
  };

  return (
    <>
      <Flex
        w="100%"
        h="calc(100vh - 133px)"
        alignItems="center"
        justifyContent="center"
      >
        <NeuralNetwork w="65vw" mlp={mlp} gradient={gradient} />

        <ScatteredChart
          w={'25vw'}
          h={'25vw'}
          xAxis={xAxis}
          yAxis={yAxis}
          resolution={resolution}
          points={testData}
          trainingData={trainingData}
        />
      </Flex>

      <Box
        h={70}
        display="flex"
        borderTopWidth={1}
        borderTopStyle="solid"
        borderColor="lightGray"
        alignItems="center"
        justifyContent="flex-end"
        paddingRight={5}
        paddingLeft={5}
      >
        <Loss value={mlp.loss} />

        <Button marginLeft={5} onClick={handleTrain}>
          Train
        </Button>
      </Box>
    </>
  );
};

export default NeuralNetworks;
