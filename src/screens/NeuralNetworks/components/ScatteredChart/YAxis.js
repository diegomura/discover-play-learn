import { Fragment } from 'react';

const YAxis = ({ width, height, xAxis, yAxis, xScale, yScale }) => {
  const yAxisX = (0 - xAxis[0]) * xScale;

  const scales = [];

  for (let i = yAxis[0] + 1; i < yAxis[1]; i++) {
    const y = height - (i - yAxis[0]) * yScale;
    const lineX = (0 - xAxis[0]) * xScale - 5;

    scales.push(
      <Fragment key={y}>
        <line
          x1={lineX - 5}
          y1={y}
          x2={lineX + 5}
          y2={y}
          stroke="black"
          strokeWidth="2"
        />

        {i !== 0 && (
          <text
            x={lineX + 25}
            y={y}
            fontSize={12}
            alignmentBaseline="middle"
            textAnchor="middle"
          >
            {i}
          </text>
        )}
      </Fragment>
    );
  }

  return (
    <>
      <line
        x1={yAxisX}
        y1={height}
        x2={yAxisX}
        y2={0}
        stroke="black"
        strokeWidth="2"
      />

      {scales}
    </>
  );
};

export default YAxis;
