import {combineReducers} from 'redux';

import auth from './globalReducers/AuthReducer';
import index from './modules/Index/IndexReducer';

export default combineReducers({
  auth,
  index
});
