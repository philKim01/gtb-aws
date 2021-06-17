import React from "react";
import { connect } from "react-redux";
import { fetchCart } from "../store/redux/cart";

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
    const { cartItems } = this.props;
    return (
      <ul style={{ listStyleType: "none" }}>
        {cartItems.map((cartItem) => {
          return (
            <li key={cartItem.id}>
              <p>{cartItem.product.name}</p>
              <p>{cartItem.price}</p>
              <p>{cartItem.quantity}</p>
            </li>
          );
        })}
      </ul>
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
    getCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapState, mapDisptach)(Cart);
