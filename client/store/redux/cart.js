import axios from "axios";

const TOKEN = "token";

// ACTION TYPES
const SET_CART_ITEMS = "SET_CART_ITEMS";
const CREATE_CART_ITEM = "CREATE_CART_ITEM";
const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";
const CLEAR_CART = "CLEAR_CART";

// ACTION CREATORS
export const setCartItems = (cartItems) => {
  return {
    type: SET_CART_ITEMS,
    cartItems,
  };
};

export const createCartItem = (cartItem) => {
  return {
    type: CREATE_CART_ITEM,
    cartItem,
  };
};

export const updateCartItem = (cartItem) => {
  return {
    type: UPDATE_CART_ITEM,
    cartItem,
  };
};

export const removeCartItem = (cartItem) => {
  return {
    type: REMOVE_CART_ITEM,
    cartItem,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

// THUNKS
export const fetchCartItems = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.get("/api/cartItems", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setCartItems(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const postCartItem = (productId, price) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.post(
          "/api/cartItems",
          { productId, price },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(createCartItem(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const putCartItem = (id, quantity) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.put(
          `/api/cartItems/${id}`,
          { quantity },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(updateCartItem(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const deleteCartItem = (id) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.delete(`/api/cartItems/${id}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(removeCartItem(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

const initialState = { total: 0, cartItems: [] };

// REDUCER
const cartReducer = (state = initialState, action) => {
  const reducer = (accumulator, currentVal) => {
    return accumulator + currentVal.price * currentVal.quantity;
  };

  switch (action.type) {
    case SET_CART_ITEMS: {
      let total = action.cartItems.reduce(reducer, 0);
      return { total, cartItems: action.cartItems };
    }
    case CREATE_CART_ITEM: {
      let total = state.total + action.cartItem.price;
      return { total, cartItems: [...state.cartItems, action.cartItem] };
    }
    case UPDATE_CART_ITEM: {
      const cartItems = state.cartItems.map((cartItem) => {
        if (cartItem.id === action.cartItem.id) {
          return action.cartItem;
        } else {
          return cartItem;
        }
      });
      let total = cartItems.reduce(reducer, 0);
      return { total, cartItems };
    }
    case REMOVE_CART_ITEM: {
      let total =
        state.total - action.cartItem.price * action.cartItem.quantity;
      const cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.cartItem.id
      );
      return { total, cartItems };
    }
    case CLEAR_CART: {
      return { total: 0, cartItems: [] };
    }
    default: {
      return state;
    }
  }
};

export default cartReducer;
