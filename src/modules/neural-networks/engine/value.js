import EventEmitter from 'events';

let id = 0;

class Value extends EventEmitter {
  constructor({ data, children = [], op = '', label = '' }) {
    super();

    this.data = data;
    this.grad = 0;

    this.id = id++;
    this.op = op;
    this.label = label;
    this.prev = children;
    this._backward = () => {};
  }

  static Zero() {
    return new Value({ data: 0 });
  }

  set(data) {
    this.data = data;
    this.emit('update', data);
  }

  add(other) {
    other = typeof other === 'number' ? new Value({ data: other }) : other;

    const out = new Value({
      data: this.data + other.data,
      children: [this, other],
      op: '+',
    });

    out._backward = () => {
      this.grad += 1.0 * out.grad;
      other.grad += 1.0 * out.grad;
    };

    return out;
  }

  sub(other) {
    other = typeof other === 'number' ? new Value({ data: other }) : other;
    return this.add(other.neg());
  }

  mul(other) {
    other = typeof other === 'number' ? new Value({ data: other }) : other;

    const out = new Value({
      data: this.data * other.data,
      children: [this, other],
      op: '*',
    });

    out._backward = () => {
      this.grad += other.data * out.grad;
      other.grad += this.data * out.grad;
    };

    return out;
  }

  pow(other) {
    const out = new Value({
      data: this.data ** other,
      children: [this],
      op: `**${other}`,
    });

    out._backward = () => {
      this.grad += (other * this.data) ** (other - 1);
    };

    return out;
  }

  neg() {
    return this.mul(-1);
  }

  tanh() {
    const n = this.data;
    const t = (Math.exp(2 * n) - 1) / (Math.exp(2 * n) + 1);
    const out = new Value({ data: t, children: [this], op: 'tanh' });

    out._backward = () => {
      this.grad += (1 - t ** 2) * out.grad;
    };

    return out;
  }

  setLabel(label) {
    this.label = label;
    return this;
  }

  backward() {
    this.grad = 1;

    const topo = [];
    const visited = {};

    const buildTopo = v => {
      if (!visited[v]) {
        visited[v.id] = true;
        v.prev.forEach(child => buildTopo(child));
        topo.push(v);
      }
    };

    buildTopo(this);

    topo.reverse().forEach(v => v._backward());
  }
}

export default Value;
