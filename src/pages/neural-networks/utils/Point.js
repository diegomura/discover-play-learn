class Point {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.key = `${x}-${y}`;
    this.color = 'black';
  }

  setColor(color) {
    this.color = color;
  }
}

export default Point;
