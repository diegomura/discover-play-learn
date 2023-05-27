import Value from './value.js'

class Neuron {
  constructor({ nin }) {
    this.bias = new Value({ data: Math.random() * 2 - 1 })
    this.weights = Array.from({ length: nin }, () => new Value({ data: Math.random() * 2 - 1 }))
  }

  get parameters() {
    return [...this.weights, this.bias]
  }

  call(inputs) {
    let out = this.bias

    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      const weight = this.weights[i];

      out = out.add(input.mul(weight))
    }

    return out.tanh()
  }
}

export default Neuron
