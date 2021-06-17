import axios from 'axios';

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS';
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CREATE_PRODUCT = "CREATE_PRODUCT";

// ACTION CREATORS
export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product
  }
}

export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

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

export const fetchProductToDelete = (id, history) => {
  return async (dispatch) => {
    const response = await axios.delete(`/api/products/${id}`)
    const productToDelete = response.data
    dispatch(deleteProduct(productToDelete))
    history.push("/products")
  }
}

export const fetchNewProduct = (product) => {
  return async (dispatch) => {
    const response = await axios.post("/api/products", product)
    const newProduct = response.data
    dispatch(createProduct(newProduct))
  }
}

const initialState = [];

// REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id)
    case CREATE_PRODUCT:
      return [...state, action.product]
    default:
      return state;
  }
};

export default productsReducer;
