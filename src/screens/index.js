import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Root from './Root';
import Home from './Home';
import NotFound from './NotFound';
import NeuralNetworks from './NeuralNetworks';

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
      <Route path="/neural-networks" element={<NeuralNetworks />} />
    </Router>
  );
};

export default Screens;
