import EventEmitter from 'events';

class Point extends EventEmitter {
  constructor({ x, y }) {
    super();

    this.x = x;
    this.y = y;
    this.key = `${x}${y}`;
    this.color = 'black';
  }

  setColor(color) {
    this.color = color;
    this.emit('update', { color });
  }
}

export default Point;
