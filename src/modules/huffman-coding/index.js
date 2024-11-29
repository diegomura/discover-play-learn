import EventEmitter from 'events';

export const STEPS = {
  NOT_STARTED: 0,
  COMPUTED_FREQUENCIES: 1,
  COMPUTED_ENTROPY: 2,
  SORTED_FREQUENCIES: 3,
  BUILT_TREE: 4,
  FINISHED_TREE: 5,
  BUILT_TABLE: 6,
  TEXT_ENCODED: 7,
  COMPUTED_OUTPUT_ENTROPY: 8,
  FINISHED: 9,
};

class HuffmanCoding extends EventEmitter {
  #text = '';
  #trees = [];
  #frequencies = [];
  #table = [];
  #history = [];
  #encodedData = [];
  #entropy = 0;
  #outputEntropy = 0;
  #step = STEPS.NOT_STARTED;

  get state() {
    return {
      step: this.#step,
      trees: this.#trees,
      table: this.#table,
      entropy: this.#entropy,
      encodedData: this.#encodedData,
      outputEntropy: this.#outputEntropy,
      canGoBack: this.#history.length > 0,
    };
  }

  computeFrequencies = () => {
    const chars = this.#text.split('');
    const increment = 1 / chars.length;

    this.#frequencies = chars.reduce((acc, char) => {
      acc[char] = acc[char] ? acc[char] + increment : increment;
      return acc;
    }, {});

    this.#trees = Object.entries(this.#frequencies).map(([label, weight]) => ({
      weight,
      label,
    }));

    this.#step = STEPS.COMPUTED_FREQUENCIES;
  };

  computeEntropy = () => {
    this.#entropy = this.#trees.reduce((acc, node) => {
      return acc + node.weight * Math.log2(1 / node.weight);
    }, 0);

    this.#step = STEPS.COMPUTED_ENTROPY;
  };

  sortFrequencies = () => {
    this.#trees = [...this.#trees.sort((a, b) => a.weight - b.weight)];
    this.#step = STEPS.SORTED_FREQUENCIES;
  };

  buildTree = () => {
    const [first, second, ...rest] = this.#trees;

    const combinedTree = {
      weight: first.weight + second.weight,
      left: first,
      right: second,
    };

    this.#trees = [combinedTree, ...rest];

    this.#step =
      this.#trees.length === 1 ? STEPS.FINISHED_TREE : STEPS.BUILT_TREE;
  };

  buildTable = () => {
    const buildTableRecursively = (node, path = '') => {
      if (!node) return;

      if (!node.right || !node.left) {
        return [{ label: node.label, path }];
      }

      const leftNodes = buildTableRecursively(node.left, path + '0');
      const rightNodes = buildTableRecursively(node.right, path + '1');

      return [...leftNodes, ...rightNodes];
    };

    this.#table = buildTableRecursively(this.#trees[0]).sort(
      (a, b) => a.path.length - b.path.length
    );

    this.#step = STEPS.BUILT_TABLE;
  };

  encodeText = () => {
    const lookup = this.#table.reduce((acc, { label, path }) => {
      acc[label] = path;
      return acc;
    }, {});

    const chars = this.#text.split('');

    this.#encodedData = chars.map(char => lookup[char]);

    this.#step = STEPS.TEXT_ENCODED;
  };

  computeOutputEntropy = () => {
    const lookup = this.#table.reduce((acc, { label, path }) => {
      acc[label] = path;
      return acc;
    }, {});

    this.#outputEntropy = Object.entries(this.#frequencies).reduce(
      (acc, [char, frequency]) => {
        const bits = lookup[char].length;
        return acc + frequency * bits;
      },
      0
    );

    this.#step = STEPS.COMPUTED_OUTPUT_ENTROPY;
  };

  finish = () => {
    this.#step = STEPS.FINISHED;
  };

  next = () => {
    if (this.step === STEPS.FINISHED_TREE) return;

    this.#history.push(this.state);

    const nextStepMap = {
      [STEPS.NOT_STARTED]: this.computeFrequencies,
      [STEPS.COMPUTED_FREQUENCIES]: this.computeEntropy,
      [STEPS.COMPUTED_ENTROPY]: this.sortFrequencies,
      [STEPS.SORTED_FREQUENCIES]: this.buildTree,
      [STEPS.BUILT_TREE]: this.sortFrequencies,
      [STEPS.FINISHED_TREE]: this.buildTable,
      [STEPS.BUILT_TABLE]: this.encodeText,
      [STEPS.TEXT_ENCODED]: this.computeOutputEntropy,
      [STEPS.COMPUTED_OUTPUT_ENTROPY]: this.finish,
    };

    if (!nextStepMap[this.#step]) return;

    nextStepMap[this.#step]();

    this.emit('update', this.state);
  };

  back = () => {
    const previousState = this.#history.pop();

    if (previousState) {
      this.#step = previousState.step;
      this.#trees = previousState.trees;
      this.#table = previousState.table;
      this.#entropy = previousState.entropy;
      this.#outputEntropy = previousState.outputEntropy;
      this.#encodedData = previousState.encodedData;

      this.emit('update', this.state);
    }
  };

  reset = () => {
    this.#step = STEPS.NOT_STARTED;
    this.#trees = [];
    this.#table = [];
    this.#entropy = 0;
    this.#outputEntropy = 0;
    this.#encodedData = [];
    this.#history = [];
    this.emit('update', this.state);
  };

  setText = text => {
    this.#text = text;
  };
}

export default HuffmanCoding;
