import React, { useEffect, useState } from 'react';

import Weight from './Weight';

const Neuron = ({ id, box, neuron, gradient, inputs, isLast }) => {
  const [bias, setBias] = useState(neuron.bias.data);

  const { x, y, width, height } = box;

  useEffect(() => {
    const handleBiasChange = bias => setBias(bias);
    neuron.bias.addListener('update', handleBiasChange);
    return () => neuron.bias.removeListener('update', handleBiasChange);
  }, [neuron.bias]);

  return (
    <>
      {inputs.map((child, i) => (
        <Weight
          key={`${id}${child.id}`}
          value={neuron.weights[i]}
          from={child.box}
          to={box}
          gradient={gradient}
        />
      ))}

      {!isLast && (
        <g cursor="pointer">
          <rect
            x={x}
            y={y}
            rx="15"
            width={width}
            height={height}
            stroke="gray"
            fill="white"
            strokeWidth="3"
          />

          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {bias.toFixed(3)}
          </text>
        </g>
      )}
    </>
  );
};

export default Neuron;
