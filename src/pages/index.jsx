import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../components/layout';
import NotFound from './not-found';
import pages from './pages';

const Router = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} errorElement={<NotFound />}>
          {children}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const Pages = () => {
  return (
    <Router>
      <Route path="/" Component={pages.Home} />
      <Route path="/utf-8" Component={pages.Utf8Encoding} />
      <Route path="/neural-networks" Component={pages.NeuralNetworks} />
      <Route path="/three-body-problem" Component={pages.ThreeBodyProblem} />
    </Router>
  );
};

export default Pages;
