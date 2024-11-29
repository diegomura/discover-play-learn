import { useEffect, useRef, useState } from 'react';
import { useBoolean, useInterval } from 'react-use';

import HuffmanCoding, { STEPS } from '#/huffman-coding';
import Text from '%/components/text';
import Button from '%/components/button';
import SmartText from '%/components/smart-text';

import { INITIAL_TEXT } from './constants';
import BinaryTree from './components/binary-tree';
import HuffmanTable from './components/huffman-table';
import Section from './components/section';
import EncodedData from './components/encoded-data';

const instance = new HuffmanCoding();

const STATUS_LABEL = {
  [STEPS.COMPUTED_FREQUENCIES]: 'Computed frequencies',
  [STEPS.COMPUTED_ENTROPY]: 'Computed data entropy',
  [STEPS.SORTED_FREQUENCIES]: 'Sorted frequencies from least to greatest',
  [STEPS.BUILT_TREE]: 'Merged two least frequent nodes',
  [STEPS.FINISHED_TREE]: 'Finished building the tree',
  [STEPS.BUILT_TABLE]: 'Huffman table built',
  [STEPS.TEXT_ENCODED]: 'Text encoded',
  [STEPS.COMPUTED_OUTPUT_ENTROPY]: 'Computed output entropy',
  [STEPS.FINISHED]: 'Finished',
};

const FINISHED_TREE_ARCS = [
  { color: 'red', label: '0' },
  { color: 'green', label: '1' },
];

const HuffmanCodingPage = () => {
  const sourceText = useRef(null);

  const [text, setText] = useState(INITIAL_TEXT);

  const [simulation, setSimulation] = useState({});

  const [isRunning, toggleIsRunning] = useBoolean(false);

  useInterval(() => instance.next(), isRunning ? 100 : null);

  const [highlightedPath, setHighlightedPath] = useState(null);

  useEffect(() => {
    instance.setText(INITIAL_TEXT);
    instance.on('update', setSimulation);

    setSimulation(instance.state);

    return () => instance.off('update', setSimulation);
  }, []);

  const handleTextChange = text => {
    instance.setText(text);
    setText(text);
  };

  const handleRowHover = value => {
    setHighlightedPath(value?.path || null);
  };

  const handleDataHover = index => {
    if (index === null) {
      sourceText.current?.blurHighlight();
    } else {
      sourceText.current?.highlightRange(index, index + 1);
    }
  };

  const handleReset = () => {
    toggleIsRunning(false);
    instance.reset();
  };

  const arcs =
    simulation.step >= STEPS.FINISHED_TREE ? FINISHED_TREE_ARCS : null;

  const canEditText = simulation.step !== STEPS.NOT_STARTED;

  const isFinished = simulation.step === STEPS.FINISHED;

  return (
    <div className="flex flex-1 flex-col">
      <Section
        title="Source"
        className="h-[20vh] border-b border-r-neutral-300"
      >
        <SmartText
          ref={sourceText}
          value={text}
          disabled={canEditText}
          className="text-sm"
          onChange={handleTextChange}
        />
      </Section>

      <Section
        title="Tree"
        className="h-[calc(50vh-8rem)] border-b border-r-neutral-300"
      >
        <BinaryTree
          nodes={simulation.trees}
          arcs={arcs}
          highlightedPath={highlightedPath}
        />
      </Section>

      <div className="flex h-[30vh] w-full border-b border-r-neutral-300">
        <Section title="Table" className="flex-1 border-r border-r-neutral-300">
          <HuffmanTable rows={simulation.table} onRowHover={handleRowHover} />
        </Section>

        <Section title="Output" className="flex-1">
          <EncodedData
            data={simulation.encodedData}
            onHover={handleDataHover}
          />
        </Section>
      </div>

      <div className="flex h-16 w-full items-center justify-end gap-2 p-4">
        {!!simulation.entropy && (
          <Text className="font-medium text-green-700">
            Entropy: {simulation.entropy}
          </Text>
        )}

        {!!simulation.outputEntropy && (
          <Text className="font-medium text-neutral-500">
            Output Entropy: {simulation.outputEntropy}
          </Text>
        )}

        <div className="flex-1" />

        <Text className="mr-4 font-medium italic">
          {STATUS_LABEL[simulation.step]}
        </Text>

        <Button
          disabled={!simulation.canGoBack}
          onClick={() => instance.back()}
        >
          Back
        </Button>

        <Button onClick={isFinished ? handleReset : instance.next}>
          {isFinished ? 'Reset' : 'Next'}
        </Button>

        <Button onClick={toggleIsRunning}>
          {isRunning ? 'Pause' : 'Play'}
        </Button>
      </div>
    </div>
  );
};

export default HuffmanCodingPage;
