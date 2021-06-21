import axios from "axios";

const TOKEN = "token";

// ACTION TYPES
const SET_ORDERS = "SET_ORDERS";
const CREATE_ORDER = "CREATE_ORDER";
const UPDATE_ORDER = "UPDATE_ORDER";


// ACTION CREATORS
export const setOrders = (orders) => {
  return {
    type: SET_ORDERS,
    orders,
  };
};

export const createOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

export const updateOrder = (order) => {
  return {
    type: UPDATE_ORDER,
    order,
  };
};

// THUNKS
export const fetchOrders = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.get("/api/orders", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setOrders(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const postOrder = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.post(
          "/api/orders",
          {},
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(createOrder(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

export const putOrder = (id, fulfilled) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.put(
          `/api/orders/${id}`,
          { fulfilled },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(updateOrder(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

const initialState = [];

// REDUCER
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return action.orders;
    }
    case CREATE_ORDER: {
      return [...state, action.order] ;
    }
    case UPDATE_ORDER: {
     return state.map((order) => {
        if (order.id === action.order.id) {
          return action.order;
        } else {
          return order;
        }
      });
    }
    default: {
      return state;
    }
  }
};

export default ordersReducer;