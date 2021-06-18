import axios from "axios";

const TOKEN = "token";

// ACTION TYPES
const SET_CART = "SET_CART";
const CLEAR_CART = "CLEAR_CART";

// ACTION CREATORS
export const setCart = (cart) => {
  return {
    type: SET_CART,
    cart,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

// THUNK
export const fetchCart = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCart(data));
      } catch (error) {
        console.error(error);
      }
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
    case CLEAR_CART:
      return { total: 0, cartItems: [] };
    default:
      return state;
  }
};

export default cartReducer;
