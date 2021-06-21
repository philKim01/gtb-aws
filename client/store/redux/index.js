import { combineReducers } from "redux";
import auth from "./auth";
import cartReducer from "./cart";
import productsReducer from "./products";
import singleProductReducer from "./singleProduct";
import ordersReducer from './orders'

const appReducer = combineReducers({
  auth,
  products: productsReducer,
  product: singleProductReducer,
  cart: cartReducer,
  orders: ordersReducer
});

export default appReducer;
