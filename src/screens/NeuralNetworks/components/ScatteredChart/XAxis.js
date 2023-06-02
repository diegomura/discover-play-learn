import React, { Fragment } from 'react';

const XAxis = ({ width, height, xAxis, yAxis, xScale, yScale }) => {
  const xAxisY = height - (0 - yAxis[0]) * yScale;

  const scales = [];

  for (let i = xAxis[0] + 1; i < xAxis[1]; i++) {
    const x = (i - xAxis[0]) * xScale;
    const lineY = height - (0 - yAxis[0]) * yScale - 5;

    scales.push(
      <Fragment key={x}>
        <line
          x1={x}
          y1={lineY - 5}
          x2={x}
          y2={lineY + 5}
          stroke="black"
          strokeWidth="2"
        />

        {i !== 0 && (
          <text
            x={x}
            y={lineY + 20}
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
        x1={0}
        y1={xAxisY}
        x2={width}
        y2={xAxisY}
        stroke="black"
        strokeWidth="2"
      />

      {scales}
    </>
  );
};

export default XAxis;
