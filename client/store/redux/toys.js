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
const SET_TOYS = 'SET_TOYS';

// ACTION CREATORS
export const setToys = (toys) => {
  return {
    type: SET_TOYS,
    toys
  };
};

// THUNK
export const fetchToys = () => {
  return async (dispatch) => {
    try {
      // const response = await axios.get('/api/toys');
      // const { data } = response;
      dispatch(setToys(products));
    } catch (error) {
      console.log('Error fetching toys from database');
    }
  };
};

const initialState = {
  toys: []
};

// REDUCER
const toysReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOYS:
      return { ...state, toys: action.toys };
    default:
      return state;
  }
};

export default toysReducer;
