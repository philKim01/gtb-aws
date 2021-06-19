import React from "react";
import { connect } from "react-redux";
import { fetchCartItems } from "../store/redux/cart";

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super();
    //This is in preparation for some handlClick events
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
            return (
              <li key={cartItem.id}>
                <p>{cartItem.product.name}</p>
                <p>{`$${cartItem.price / 100}`}</p>
                <p>{cartItem.quantity}</p>
              </li>
            );
          })}
        </ul>
        <p>{`$${total / 100}`}</p>
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
  };
};

export default connect(mapState, mapDisptach)(Cart);
