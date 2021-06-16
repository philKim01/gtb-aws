import { combineReducers } from 'redux';
import auth from './auth';
import productsReducer from './products';
import singleProductReducer from './singleProduct';
const appReducer = combineReducers({
  auth,
  products: productsReducer,
  product: singleProductReducer
});

export default appReducer;
