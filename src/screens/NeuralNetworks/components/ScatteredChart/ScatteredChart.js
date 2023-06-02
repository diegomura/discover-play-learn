import React from 'react';

import XAxis from './XAxis';
import YAxis from './YAxis';
import Point from './Point';

const ScatteredChart = ({
  points = [],
  xAxis = [-10, 10],
  yAxis = [-10, 10],
  width = 500,
  height = 500,
}) => {
  const xScale = width / (xAxis[1] - xAxis[0]);
  const yScale = height / (yAxis[1] - yAxis[0]);

  return (
    <svg width={width} height={height}>
      <defs>
        <clipPath id="chart">
          <rect x={0} y={0} width={width} height={width} rx="15" />
        </clipPath>
      </defs>

      <g clipPath="url(#chart)">
        {points.map((point, i) => {
          const cx = (point.x - xAxis[0]) * xScale;
          const cy = height - (point.y - yAxis[0]) * yScale;

          return <Point key={point.key} cx={cx} cy={cy} point={point} />;
        })}
      </g>

      <XAxis
        width={width}
        height={height}
        xAxis={xAxis}
        yAxis={yAxis}
        xScale={xScale}
        yScale={yScale}
      />

      <YAxis
        width={width}
        height={height}
        xAxis={xAxis}
        yAxis={yAxis}
        xScale={xScale}
        yScale={yScale}
      />

      <rect
        x={1.5}
        y={1.5}
        width={width - 3}
        height={width - 3}
        rx="15"
        stroke="gray"
        fill="none"
        strokeWidth="3"
      />
    </svg>
  );
};

export default ScatteredChart;
