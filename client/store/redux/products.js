import axios from 'axios';

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';

// ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

// THUNK
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products');
      const { data } = response;
      dispatch(setProducts(data))
    } catch (error) {
      console.log('Error fetching products from database');
    }
  };
};

const initialState = [];

// REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};

export default productsReducer;
