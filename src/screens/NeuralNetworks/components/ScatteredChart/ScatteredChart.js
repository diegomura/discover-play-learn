import React from 'react';

import XAxis from './XAxis';
import YAxis from './YAxis';
import Point from './Point';

const WIDTH = 600;
const HEIGHT = 600;

const ScatteredChart = ({ points = [], xAxis, yAxis, resolution, w, h }) => {
  const xScale = WIDTH / (xAxis[1] - xAxis[0]);
  const yScale = HEIGHT / (yAxis[1] - yAxis[0]);
  const resAdjustment = resolution * 0.1;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
      <defs>
        <clipPath id="chart">
          <rect x={0} y={0} width={WIDTH} height={HEIGHT} rx="15" />
        </clipPath>
      </defs>

      <g clipPath="url(#chart)" opacity={0.9}>
        {points.map(point => {
          const x = point.x - resolution / 2;
          const y = point.y - resolution / 2;
          const cx = (x - xAxis[0]) * xScale;
          const cy = HEIGHT - (y - yAxis[0]) * yScale;
          const height = (resolution + resAdjustment) * xScale;
          const width = (resolution + resAdjustment) * yScale;

          return (
            <Point
              key={point.key}
              x={cx}
              y={cy}
              height={height}
              width={width}
              point={point}
            />
          );
        })}
      </g>

      <XAxis
        width={WIDTH}
        height={HEIGHT}
        xAxis={xAxis}
        yAxis={yAxis}
        xScale={xScale}
        yScale={yScale}
      />

      <YAxis
        width={WIDTH}
        height={HEIGHT}
        xAxis={xAxis}
        yAxis={yAxis}
        xScale={xScale}
        yScale={yScale}
      />

      <rect
        x={1.5}
        y={1.5}
        width={WIDTH - 3}
        height={HEIGHT - 3}
        rx="15"
        stroke="gray"
        fill="none"
        strokeWidth="3"
      />
    </svg>
  );
};

export default ScatteredChart;
