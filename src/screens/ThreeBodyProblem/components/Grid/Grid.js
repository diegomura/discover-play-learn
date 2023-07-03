import { Grid as ThreeGrid } from '@react-three/drei';

const gridConfig = {
  cellSize: 10,
  cellThickness: 0.8,
  cellColor: '#2d2d2d',
  sectionSize: 100,
  sectionThickness: 0.8,
  sectionColor: '#2d2d2d',
  fadeDistance: 5000,
  fadeStrength: 3,
  followCamera: false,
  infiniteGrid: true,
};

const Grid = () => {
  return (
    <ThreeGrid
      rotation-x={Math.PI / 2}
      position={[0, -0.01, 0]}
      args={[10, 10]}
      {...gridConfig}
    />
  );
};

export default Grid;
