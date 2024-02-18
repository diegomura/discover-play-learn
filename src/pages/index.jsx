import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Root from './root';
import Home from './home';
import NotFound from './not-found';
import NeuralNetworks from './neural-networks';
import Utf8Encoding from './utf-8';
import ThreeBodyProblem from './three-body-problem';

const Router = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} errorElement={<NotFound />}>
          {children}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const Screens = () => {
  return (
    <Router>
      <Route path="/" element={<Home />} />
      <Route path="/utf-8" element={<Utf8Encoding />} />
      <Route path="/neural-networks" element={<NeuralNetworks />} />
      <Route path="/three-body-problem" element={<ThreeBodyProblem />} />
    </Router>
  );
};

export default Screens;
