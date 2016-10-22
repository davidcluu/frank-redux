import { createStore, applyMiddleware } from 'redux';
//import thunkMiddleware from 'redux-thunk';
//import api from './middleware/api';
import rootReducer from './reducers';

//const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore);

export function configureStore(initialState = {}) {
  return createStore(rootReducer);
}
