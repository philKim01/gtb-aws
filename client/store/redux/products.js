import axios from 'axios';

const TOKEN = "token";

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  };
};

// THUNK
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('/api/products');
      const { data } = response;
      dispatch(setProducts(data));
    } catch (error) {
      console.log('Error fetching products from database');
    }
  };
};

export const updatingProduct = (id, changesMade) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data: product } = await axios.put(
          `/api/products/${id}`,
          changesMade,
          {
            headers: {
              authorization: token
            }
          }
        );
        dispatch(updateProduct(product));
      } catch (err) {
        console.log('Error updating Product');
      }
    }
  };
};

const initialState = [];

// REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    default:
      return state;
  }
};

export default productsReducer;
