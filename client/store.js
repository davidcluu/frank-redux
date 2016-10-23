import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory))
  );
}
