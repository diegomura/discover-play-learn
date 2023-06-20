import fs from 'fs';

const defaultStyle = {
  padding: 50,
};
class ScatteredChart {
  constructor({
    title,
    width = 1200,
    height = 600,
    xAxis,
    yAxis,
    style = defaultStyle,
  }) {
    this.title = title;
    this.width = width;
    this.height = height;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.style = style;
    this.points = [];

    // Calculate the scaling factor for the data points
    this.xScale = this.width / (this.xAxis[1] - this.xAxis[0]);
    this.yScale = this.height / (this.yAxis[1] - this.yAxis[0]);
  }

  addPoint(point) {
    this.points = [...this.points, point];
  }

  addPoints(points) {
    this.points = [...this.points, ...points];
  }

  #renderCircle({ cx, cy, radius, fill }) {
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${fill}" />`;
  }

  #renderRect({ x, y, width, height, fill = 'none', stroke = 'black' }) {
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="${fill}" stroke="${stroke}" stroke-width="2" />`;
  }

  #renderLine({ x1, y1, x2, y2 }) {
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="black" stroke-width="2" />`;
  }

  #renderLabel({ x, y, fontSize = 16, text }) {
    return `<text x="${x}" y="${y}" font-size="${fontSize}" alignment-baseline="middle" text-anchor="middle" font-weight="bold" >${text}</text>`;
  }

  #renderBackground() {
    return this.#renderRect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
      fill: 'white',
      stroke: 'none',
    });
  }

  #renderTitle() {
    if (!this.title) return '';

    return this.#renderLabel({
      x: '50%',
      y: 25,
      fontSize: 24,
      text: this.title,
    });
  }

  #renderXAxis() {
    let axis = '';

    const xAxisY = this.height - (0 - this.yAxis[0]) * this.yScale;

    axis += this.#renderLine({ x1: 0, y1: xAxisY, x2: this.width, y2: xAxisY });

    axis += `<polygon
      fill="black"
      points="${this.width},${xAxisY} ${this.width - 8},${xAxisY - 8} ${
      this.width - 8
    },${xAxisY + 8}"
    />`;

    for (let i = this.xAxis[0] + 1; i < this.xAxis[1]; i++) {
      const x = (i - this.xAxis[0]) * this.xScale;
      const lineY = this.height - (0 - this.yAxis[0]) * this.yScale - 5;

      axis += this.#renderLine({ x1: x, y1: lineY - 5, x2: x, y2: lineY + 5 });

      if (i !== 0) axis += this.#renderLabel({ x, y: lineY + 20, text: i });
    }

    return axis;
  }

  #renderYAxis() {
    let axis = '';

    const yAxisX = (0 - this.xAxis[0]) * this.xScale;

    axis += this.#renderLine({
      x1: yAxisX,
      y1: this.height,
      x2: yAxisX,
      y2: 0,
    });

    axis += `<polygon
      fill="black"
      points="${yAxisX},${0} ${yAxisX - 8},${8} ${yAxisX + 8},${8}"
    />`;

    for (let i = this.yAxis[0] + 1; i < this.yAxis[1]; i++) {
      const y = this.height - (i - this.yAxis[0]) * this.yScale;
      const lineX = (0 - this.xAxis[0]) * this.xScale - 5;

      axis += this.#renderLine({ x1: lineX - 5, y1: y, x2: lineX + 5, y2: y });

      if (i !== 0) axis += this.#renderLabel({ x: lineX + 25, y, text: i });
    }

    return axis;
  }

  render() {
    let content = `<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">`;

    const chartBox = this.#renderRect({
      x: 0,
      y: 0,
      width: this.width,
      height: this.height,
    });

    content += `<defs><clipPath id="chart">${chartBox}</clipPath></defs>`;

    content += this.#renderBackground();
    content += this.#renderTitle();

    const padding = this.style.padding || 0;
    const xScale = (this.width - padding * 2) / this.width;
    const yScale = (this.height - padding * 2) / this.height;

    content += `<g
      clip-path="url(#chart)"
      transform="scale(${xScale}, ${yScale})"
      transform-origin="${this.width / 2} ${this.height / 2}"
    >`;

    content += chartBox;

    this.points.forEach(point => {
      const radius = point.radius || 3;
      const cx = (point.x - this.xAxis[0]) * this.xScale;
      const cy = this.height - (point.y - this.yAxis[0]) * this.yScale;

      content += this.#renderCircle({
        cx,
        cy,
        radius,
        fill: point.fill || 'black',
      });
    });

    content += this.#renderXAxis();
    content += this.#renderYAxis();

    content += '</g>';
    content += '</svg>';

    return content;
  }

  export(fileName = 'chart.svg') {
    const svg = this.render();

    fs.writeFileSync(fileName, svg, 'utf8');
  }
}

export default args => new ScatteredChart(args);
