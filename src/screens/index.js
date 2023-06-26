import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Root from './Root';
import Home from './Home';
import NotFound from './NotFound';
import NeuralNetworks from './NeuralNetworks';
import Utf8Encoding from './Utf8Encoding';
import ThreeBodyProblem from './ThreeBodyProblem';

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
      <Route path="/utf-8-encoding" element={<Utf8Encoding />} />
      <Route path="/neural-networks" element={<NeuralNetworks />} />
      <Route path="/three-body-problem" element={<ThreeBodyProblem />} />
    </Router>
  );
};

export default Screens;
