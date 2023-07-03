import React, { useEffect, useState } from 'react';
import { Line } from '@react-three/drei';

const Path = ({ position, color }) => {
  const [points, setPoints] = useState([position]);

  useEffect(() => {
    setPoints(oldPoints => oldPoints.concat([position]));
  }, [position]);

  return <Line points={points} color={color} lineWidth={1} />;
};

export default Path;
