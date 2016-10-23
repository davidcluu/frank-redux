import {compose, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import postsApiMiddleware from './reduxMiddleware/postsApi';
import {browserHistory} from 'react-router';

import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunkMiddleware,
        routerMiddleware(browserHistory),
        postsApiMiddleware
      )
    )
  );
}
