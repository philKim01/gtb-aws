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

const initialState = { total: 0, cartItems: [] };

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CART:
      // Calculate updated total and update cartItems array
      const reducer = (accumulator, currentVal) => {
        return accumulator + currentVal.price;
      };
      const total = action.cart.orderItems.reduce(reducer, 0);
      return { total, cartItems: action.cart.orderItems };
    default:
      return state;
  }
};

export default cartReducer;
