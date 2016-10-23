import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

  return createStoreWithMiddleware(rootReducer);
}
