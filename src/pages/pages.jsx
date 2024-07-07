import { mapValues } from 'lodash';

import Home from './home';
import NeuralNetworks from './neural-networks';
import Utf8Encoding from './utf-8';
import ThreeBodyProblem from './three-body-problem';
import Topic from '../components/topic';

const pages = {
  Home,
  NeuralNetworks,
  Utf8Encoding,
  ThreeBodyProblem,
};

const addTopic = manifest => {
  const { page: Page, title, sources, documentation, theme } = manifest;

  if (!title) return Page;

  const page = () => (
    <Topic
      title={title}
      sources={sources}
      documentation={documentation}
      theme={theme}
    >
      <Page />
    </Topic>
  );

  return page;
};

// eslint-disable-next-line react-refresh/only-export-components
export default mapValues(pages, addTopic);
