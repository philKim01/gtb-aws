import React from "react";
import { connect } from "react-redux";
import { fetchCartItems, putCartItem } from "../store/redux/cart";
import { checkout } from "../store/redux/orders";
import CartItem from "./CartItem";


/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getCart();
  }

  render() {
    const { total } = this.props;
    const cartItems = this.props.cartItems || [];
    return (
      <React.Fragment>
        <ul style={{ listStyleType: "none" }}>
          {cartItems.map((cartItem) => {
            return <CartItem key={cartItem.id} cartItem={cartItem} />;
          })}
        </ul>
        <p>{`$${total / 100}`}</p>
        <button type="submit" onClick={() => {
          this.props.markFulfilled(this.props.cartItems[0].orderId, true)
        }} >Place Order</button>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    cartItems: state.cart.cartItems,
    total: state.cart.total,
  };
};

const mapDisptach = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCartItems()),
    updateQuantity: (cartItemId, quantity) =>
      dispatch(putCartItem(cartItemId, quantity)),
      markFulfilled: (id, fulfilled) => dispatch(checkout(id, fulfilled)),
  };
};

export default connect(mapState, mapDisptach)(Cart);
