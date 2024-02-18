/* eslint-disable react/no-unknown-property */

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

import createModel from '#/three-body';

import sources from './sources';
import Topic from '../../components/Topic';
import Sun from './components/Sun';
import Axes from './components/Axes';
import Grid from './components/Grid';
import Path from './components/Path';

const bodies = [
  {
    id: 1,
    mass: 30,
    velocity: [0, 0.08, 0],
    position: [400, 0, 25],
    color: 'red',
  },
  {
    id: 2,
    mass: 30,
    velocity: [0, -0.12, 0],
    position: [-400, 0, -30],
    color: 'green',
  },
  {
    id: 3,
    mass: 30,
    velocity: [0, 0, 0.04],
    position: [0, 0, -350],
    color: 'blue',
  },
];

const model = createModel(bodies);

const camera = {
  position: [500, 500, 500],
  fov: 60,
  up: [0, 0, 1],
  far: 25000,
};

const ThreeBodyProblem = () => {
  const [positions, setPositions] = useState(model.getPositions());

  useEffect(() => {
    const animate = () => {
      model.next();
      setPositions(model.getPositions());

      requestAnimationFrame(() => animate());
    };

    animate();
  }, []);

  return (
    <Topic title="Three Body Problem" theme="dark" sources={sources}>
      <Canvas camera={camera} style={{ backgroundColor: 'black' }}>
        <OrbitControls />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {bodies.map((sun, i) => (
          <Sun key={sun.id} mass={sun.mass} position={positions[i]} />
        ))}

        {bodies.map((sun, i) => (
          <Path key={sun.id} color={sun.color} position={positions[i]} />
        ))}

        <Stars radius={8000} count={7000} factor={4} saturation={0} speed={0} />

        <Grid />

        <Axes />
      </Canvas>
    </Topic>
  );
};

export default ThreeBodyProblem;
