import { useRef } from 'react';

import useInterval from '%/hooks/use-interval';

import drawChart from './draw';

const WIDTH = 600;
const HEIGHT = 600;

const ScatteredChart = ({
  points = [],
  trainingData = [],
  xAxis,
  yAxis,
  resolution,
  w,
  h,
}) => {
  const canvasRef = useRef();

  useInterval(() => {
    drawChart(
      canvasRef.current,
      WIDTH,
      HEIGHT,
      xAxis,
      yAxis,
      points,
      resolution,
      trainingData
    );
  }, 100);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{
        width: w,
        height: h,
        border: '3px solid gray',
        borderRadius: '15px',
      }}
    />
  );
};

export default ScatteredChart;
