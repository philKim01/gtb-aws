import axios from "axios";

const SET_USER = "SET_USER";
const TOKEN = "token";

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

export const getUser = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      try {
        const { data } = await axios.get("/auth/me", {
          headers: {
            authorization: token,
          },
        });
        dispatch(setUser(data));
      } catch (error) {
        console.error(error);
      }
    }
  };
};

const intialState = {};

const userReducer = (state = intialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.user;
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
