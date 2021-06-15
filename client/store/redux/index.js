import { combineReducers } from 'redux';
import auth from './auth';
import toysReducer from './toys';

const appReducer = combineReducers({
  auth,
  toys: toysReducer
});

export default appReducer;
