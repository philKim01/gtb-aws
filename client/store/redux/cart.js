import axios from "axios";

// ACTION TYPES
const SET_CART = "SET_CART";

// ACTION CREATORS
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

// THUNK
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/cart");
      dispatch(setCart(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    default:
      return state;
  }
};

export default cartReducer;
