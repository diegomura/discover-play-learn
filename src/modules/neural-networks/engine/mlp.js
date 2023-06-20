import Layer from './layer.js';
import Value from './value.js';

class MLP {
  constructor({ nin, nouts }) {
    this.loss = Value.Zero();

    const sizes = [nin, ...nouts];

    this.layers = Array.from(
      { length: nouts.length },
      (_, i) => new Layer({ nin: sizes[i], nout: sizes[i + 1] })
    );
  }

  get parameters() {
    return this.layers.reduce(
      (acc, layer) => [...acc, ...layer.parameters],
      []
    );
  }

  #castInputs(inputs) {
    return inputs.map(data =>
      typeof data === 'number' ? new Value({ data }) : data
    );
  }

  call(inputs) {
    inputs = this.#castInputs(inputs);

    for (const layer of this.layers) {
      inputs = layer.call(inputs);
    }

    return inputs[0];
  }

  #forwardPass({ data }) {
    return data.map(data => this.call(data));
  }

  #evaluateLoss({ predictions, expected }) {
    return predictions.reduce(
      (acc, prediction, i) => acc.add(prediction.sub(expected[i]).pow(2)),
      Value.Zero()
    );
  }

  #zeroGrad() {
    for (const parameter of this.parameters) parameter.grad = 0;
  }

  #update() {
    for (const parameter of this.parameters)
      parameter.set(parameter.data + -0.01 * parameter.grad);
  }

  train({ data, expected }) {
    data = data.map(this.#castInputs);

    const next = () => {
      const predictions = this.#forwardPass({ data });

      const loss = this.#evaluateLoss({ predictions, expected });

      this.loss.set(loss.data);

      this.#zeroGrad();

      loss.backward();

      this.#update();
    };

    return { next };
  }
}

export default MLP;
