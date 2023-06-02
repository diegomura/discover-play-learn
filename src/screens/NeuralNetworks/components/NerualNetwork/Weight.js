import React, { useState, useEffect, useMemo } from 'react';
import { useBoolean } from '@chakra-ui/react';

const Weight = ({ from, to, value, gradient }) => {
  const [hovered, setHovered] = useBoolean();
  const [weight, setWeight] = useState(value.data);

  const x1 = from.x + from.width;
  const y1 = from.y + from.height / 2;
  const x2 = to.x;
  const y2 = to.y + to.height / 2;

  const bx = Math.abs(x2 - x1) * 0.05 + x1;
  const cx = x1 + Math.abs(x2 - x1) * 0.33;
  const dx = x2 - Math.abs(x2 - x1) * 0.33;
  const ex = -Math.abs(x2 - x1) * 0.05 + x2;
  const path = `M${x1},${y1} L${bx},${y1} C${cx},${y1} ${dx},${y2} ${ex},${y2} L${x2},${y2}`;

  const centerX = Math.abs(x2 + x1) / 2;
  const centerY = Math.abs(y2 + y1) / 2;
  const color = gradient.get(weight);

  useEffect(() => {
    const handleWeightChange = weight => setWeight(weight);
    value.addListener('update', handleWeightChange);
    return () => value.removeListener('update', handleWeightChange);
  }, [value]);

  return (
    <g>
      <path
        d={path}
        stroke={color}
        strokeWidth={hovered ? 5 : 3}
        fill="none"
        cursor="pointer"
      />

      <path
        d={path}
        strokeWidth="12"
        stroke="rgba(0, 0, 0, 0)"
        fill="none"
        cursor="pointer"
        onMouseEnter={setHovered.on}
        onMouseLeave={setHovered.off}
      />

      {hovered && (
        <g id={hovered ? 'hovered' : undefined} pointerEvents="none">
          <rect
            x={centerX - 35}
            y={centerY - 15}
            width={70}
            height={30}
            fill="white"
          />

          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {value?.data.toFixed(3)}
          </text>
        </g>
      )}
    </g>
  );
};

export default Weight;
