import Layer from './layer.js'

class MLP {
  #layers

  constructor({ nin, nouts }) {
    const sizes = [nin, ...nouts]

    this.#layers = Array.from({ length: nouts.length }, (_, i) => new Layer({ nin: sizes[i], nout: sizes[i + 1] }))
  }

  call(inputs) {
    for (const layer of this.#layers) {
      inputs = layer.call(inputs)
    }

    return inputs[0]
  }
}

export default MLP
