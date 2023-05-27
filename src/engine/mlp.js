import Layer from './layer.js'
import Value from './value.js'

class MLP {
  constructor({ nin, nouts }) {
    const sizes = [nin, ...nouts]

    this.layers = Array.from({ length: nouts.length }, (_, i) => new Layer({ nin: sizes[i], nout: sizes[i + 1] }))
  }

  get parameters() {
    return this.layers.reduce((acc, layer) => [...acc, ...layer.parameters], [])
  }

  call(inputs) {
    for (const layer of this.layers) {
      inputs = layer.call(inputs)
    }

    return inputs[0]
  }

  #forwardPass({ data }) {
    return data.map((data) => this.call(data))
  }

  #evaluateLoss({ predictions, expected }){
    return predictions.reduce((acc, prediction, i) => acc.add(prediction.sub(expected[i]).pow(2)), Value.Zero())
  }

  #zeroGrad() {
    for (const parameter of this.parameters) parameter.grad = 0
  }

  #update() {
    for (const parameter of this.parameters) parameter.data += -0.01 * parameter.grad
  }

  train({ data, expected, passes = 1000 }) {
    data = data.map(input => input.map(data => typeof data === 'number' ? new Value({ data }) : data))

    for (let i = 0; i < passes; i++) {
      const predictions = this.#forwardPass({ data })

      const loss = this.#evaluateLoss({ predictions, expected })

      this.#zeroGrad()

      loss.backward()

      this.#update()
    }
  }
}

export default MLP
