import { v4 as uuidv4 } from 'uuid'

class Value {
  #id
  #op
  #prev
  #label
  #backward

  constructor({ data, children = [], op = '', label = '' }) {
    this.data = data
    this.grad = 0

    this.#id = uuidv4()
    this.#op = op
    this.#label = label
    this.#prev = children
    this.#backward = () => {}
  }

  static Zero() {
    return new Value({ data: 0 })
  }

  get id() {
    return this.#id
  }

  get op() {
    return this.#op
  }

  get prev() {
    return this.#prev
  }

  get label() {
    return this.#label
  }

  get backward() {
    return this.#backward
  }

  set backward(value) {
    this.#backward = value
  }

  add(other) {
    other = typeof other === 'number' ? new Value({ data: other }) : other

    const out = new Value({ data: this.data + other.data, children: [this, other], op: '+' })

    out.backward = () => {
      this.grad += 1.0 * out.grad
      other.grad += 1.0 * out.grad
    }

    return out
  }

  sub(other) {
    other = typeof other === 'number' ? new Value({ data: other }) : other
    return this.add(other.neg())
  }

  mul(other) {
    other = typeof other === 'number' ? new Value({ data: other }) : other

    const out = new Value({ data: this.data * other.data, children: [this, other], op: '*' })

    out.backward = () => {
      this.grad += other.data * out.grad
      other.grad += this.data * out.grad
    }

    return out
  }

  pow(other) {
     const out = new Value({ data: this.data**other, children: [this], op: `**${other}` })

     out.backward = () => {
       this.grad += (other * this.data)**(other - 1)
     }

     return out
  }

  neg() {
    return this.mul(-1)
  }

  tanh() {
    const n = this.data
    const t = (Math.exp(2 * n) - 1) / (Math.exp(2 * n) + 1)
    const out = new Value({ data: t, children: [this], op: 'tanh' })

    out.backward = () => {
      this.grad += (1 - t ** 2) * out.grad
    }

    return out
  }

  setLabel(label) {
    this.#label = label
    return this
  }

  toString() {
    return `Value(data: ${this.data})`
  }
}

export default Value
