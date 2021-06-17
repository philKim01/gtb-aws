import axios from 'axios';

// ACTION TYPES
const SET_PRODUCT = 'SET_PRODUCT';

// ACTION CREATORS
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product
  }
}

// THUNK
export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      console.log("id = ", id)
      const response = await axios.get(`/api/products/${id}`)
      const { data } = response;
      dispatch(setProduct(data))
    } catch (err){
      console.log('Error fetching product from database')
    }
  }
}

const initialState = {
  product : {}
}

// REDUCER
const singleProductReducer = (state = initialState, action) => {
  switch(action.type){
    case SET_PRODUCT:
      return{ ...state, product: action.product }
    default:
      return state;
  }
}

export default singleProductReducer
