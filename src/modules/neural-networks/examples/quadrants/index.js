import { exec } from 'child_process';

import MLP from '#/neural-networks/mlp.js';

import { createGradient } from '../../src/render/colors.js';
import createScatteredChart from '../../src/render/scattered-chart.js';

// Create and train neuron network

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

mlp.train({ data, expected, passes: 1000 });

// Render results

const gradient = createGradient({ steps: ['#FF0000', '#00FF00', '#0000FF'] });
const scatteredChart = createScatteredChart({
  title: 'Quadrants Experiment',
  xAxis: [-10, 10],
  yAxis: [-10, 10],
});

for (let i = 0; i < 10000; i++) {
  const x = -10 + Math.random() * 20;
  const y = -10 + Math.random() * 20;
  const pred = mlp.call([x, y]);

  scatteredChart.addPoint({ x, y, fill: gradient.get(pred.data) });
}

for (const entry of data) {
  scatteredChart.addPoint({
    x: entry[0],
    y: entry[1],
    fill: 'black',
    radius: 4,
  });
}

const fileName = new URL('chart.svg', import.meta.url);

scatteredChart.export(fileName);

exec(`open "${fileName}"`);
