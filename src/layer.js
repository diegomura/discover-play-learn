import Neuron from './neuron.js'

class Layer {
  #neurons

  constructor({ nin, nout }) {
    this.#neurons = Array.from({ length: nout }, () => new Neuron({ nin }))
  }

  call(inputs) {
    return this.#neurons.map(neuron => neuron.call(inputs))
  }
}

export default Layer
