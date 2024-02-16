import { useMemo } from 'react';

import Neuron from './Neuron.jsx';

const WIDTH = 1000;
const HEIGHT = 700;
const PADDING = 3;
const NEURON_WIDTH = 80;
const NEURON_HEIGHT = 80;

const NeuralNetwork = ({ w, h, mlp, gradient }) => {
  const network = useMemo(() => {
    const dict = {};
    const nouts = mlp.layers;
    const xAdvance = (WIDTH - PADDING * 2) / (nouts.length - 1);

    for (let i = 0; i < nouts.length; i++) {
      const neurons = nouts[i].neurons;
      const yAdvance = HEIGHT / (neurons.length + 1);

      for (let j = 0; j < neurons.length; j++) {
        const neuron = neurons[j];
        const box = {
          x: i * xAdvance + PADDING,
          y: (j + 1) * yAdvance - NEURON_HEIGHT / 2,
          width: NEURON_WIDTH,
          height: NEURON_HEIGHT,
        };

        dict[neuron.id] = { id: neuron.id, box, neuron, inputs: [] };
      }
    }

    for (let i = 0; i < nouts.length; i++) {
      const layer = nouts[i];
      const nextLayer = nouts[i + 1];

      if (!nextLayer) continue;

      for (let j = 0; j < layer.neurons.length; j++) {
        for (let k = 0; k < nextLayer.neurons.length; k++) {
          const parentNeuron = layer.neurons[j];
          const childNeuron = nextLayer.neurons[k];

          dict[childNeuron.id].inputs.push(dict[parentNeuron.id]);
        }
      }
    }

    return Object.values(dict);
  }, [mlp]);

  return (
    <svg width={w} height={h} viewBox={`0 0 ${WIDTH} ${HEIGHT} `}>
      {network.map((node, i) => (
        <Neuron
          key={node.id}
          gradient={gradient}
          isLast={i === network.length - 1}
          {...node}
        />
      ))}

      <use href="#hovered" />
    </svg>
  );
};

export default NeuralNetwork;
