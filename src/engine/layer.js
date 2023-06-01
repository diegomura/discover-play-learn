import Neuron from './neuron.js';

class Layer {
  constructor({ nin, nout }) {
    this.neurons = Array.from({ length: nout }, () => new Neuron({ nin }));
  }

  get parameters() {
    return this.neurons.reduce(
      (acc, neuron) => [...acc, ...neuron.parameters],
      []
    );
  }

  call(inputs) {
    return this.neurons.map(neuron => neuron.call(inputs));
  }
}

export default Layer;
