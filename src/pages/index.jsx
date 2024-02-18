import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Root from './root';
import NotFound from './not-found';
import pages from './pages';

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
      <Route path="/" Component={pages.Home} />
      <Route path="/utf-8" Component={pages.Utf8Encoding} />
      <Route path="/neural-networks" Component={pages.NeuralNetworks} />
      <Route path="/three-body-problem" Component={pages.ThreeBodyProblem} />
    </Router>
  );
};

export default Screens;
