import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app.js';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
