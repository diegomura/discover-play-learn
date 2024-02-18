const drawXAxis = ({ ctx, width, height, xAxis, yAxis, xScale, yScale }) => {
  const xAxisY = height - (0 - yAxis[0]) * yScale;

  ctx.save();

  ctx.lineWidth = 2;
  ctx.font = '12px Arial';

  ctx.beginPath();
  ctx.moveTo(0, xAxisY);
  ctx.lineTo(width, xAxisY);
  ctx.stroke();

  for (let i = xAxis[0] + 1; i < xAxis[1]; i++) {
    const x = (i - xAxis[0]) * xScale;
    const lineY = height - (0 - yAxis[0]) * yScale - 5;

    ctx.beginPath();
    ctx.moveTo(x, lineY - 5);
    ctx.lineTo(x, lineY + 5);
    ctx.stroke();

    if (i !== 0) {
      ctx.fillText(i, x - 5, lineY + 20);
    }
  }

  ctx.restore();
};

const drawYAxis = ({ ctx, height, xAxis, yAxis, xScale, yScale }) => {
  const yAxisX = (0 - xAxis[0]) * xScale;

  ctx.save();

  ctx.lineWidth = 2;
  ctx.font = '12px Arial';

  ctx.beginPath();
  ctx.moveTo(yAxisX, height);
  ctx.lineTo(yAxisX, 0);
  ctx.stroke();

  for (let i = yAxis[0] + 1; i < yAxis[1]; i++) {
    const y = height - (i - yAxis[0]) * yScale;
    const lineX = (0 - xAxis[0]) * xScale - 5;

    ctx.beginPath();
    ctx.moveTo(lineX - 5, y);
    ctx.lineTo(lineX + 5, y);
    ctx.stroke();

    if (i !== 0) {
      ctx.fillText(i, lineX + 15, y);
    }
  }

  ctx.restore();
};

const drawPoints = ({
  ctx,
  height,
  points,
  resolution,
  xAxis,
  yAxis,
  xScale,
  yScale,
}) => {
  const resAdjustment = resolution * 0.1;

  ctx.save();

  for (const point of points) {
    if (point.color === 'black') continue;

    const x = point.x - resolution / 2;
    const y = point.y - resolution / 2;
    const cx = (x - xAxis[0]) * xScale;
    const cy = height - (y - yAxis[0]) * yScale;
    const rectHeight = (resolution + resAdjustment) * xScale;
    const rectWidth = (resolution + resAdjustment) * yScale;

    ctx.fillStyle = point.color;
    ctx.fillRect(cx, cy, rectWidth, rectHeight);
  }

  ctx.restore();
};

const drawChart = (canvas, width, height, xAxis, yAxis, points, resolution) => {
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const xScale = width / (xAxis[1] - xAxis[0]);
  const yScale = height / (yAxis[1] - yAxis[0]);

  drawPoints({
    ctx,
    height,
    points,
    resolution,
    xAxis,
    yAxis,
    xScale,
    yScale,
  });

  drawXAxis({ ctx, width, height, xAxis, yAxis, xScale, yScale });

  drawYAxis({ ctx, width, height, xAxis, yAxis, xScale, yScale });
};

export default drawChart;
