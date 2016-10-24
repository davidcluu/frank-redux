import React from 'react';
import {render} from 'react-dom';
import {configureStore} from './store';

import App from './App';

const store = configureStore(window.__INITIAL_STATE__);
const root = document.getElementById('root');

render(
  <App store={store} />,
  root
);
