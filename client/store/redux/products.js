import axios from 'axios';

const products = [
  {
    id: 1,
    name: 'Tamagotchi',
    imageUrl: 'https://tamagotchi.com/wp-content/uploads/42901D.jpg',
    price: 11.99,
    inventory: 3
  },
  {
    id: 2,
    name: 'Yoyo',
    imageUrl: 'https://rukminim1.flixcart.com/image/416/416/jod7rm80/toy-yoyo/w/7/n/wooden-yo-yo-toy-for-kids-simple-days-original-imafatgf5c4w7jfu.jpeg?q=70',
    price: 5.99,
    inventory: 3
  },
  {
    id: 3,
    name: 'Donkey Kong (Game Boy)',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71txjwyb1uL._AC_SL1500_.jpg',
    price: 15.99,
    inventory: 3
  }

]

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
      // const response = await axios.get('/api/products');
      // const { data } = response;
      // dispatch(setProducts(data))
      dispatch(setProducts(products));
    } catch (error) {
      console.log('Error fetching products from database');
    }
  };
};

const initialState = {
  products: []
};

// REDUCER
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return { ...state, products: action.products };
    default:
      return state;
  }
};

export default productsReducer;
