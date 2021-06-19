import React from "react";
import { connect } from "react-redux";
import { deleteCartItem, putCartItem } from "../store/redux/cart";

/**
 * COMPONENT
 */
class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.cartItem.quantity,
    });
  }

  handleSubmit(event) {
    this.setState({
      quantity: event.target.value,
    });
    this.props.updateQuantity(this.props.cartItem.id, event.target.value);
  }

  render() {
    const cartItem = this.props.cartItem;
    return (
      <li key={cartItem.id}>
        <p>{cartItem.product.name}</p>
        <p>{`$${cartItem.price / 100}`}</p>
        <p>{cartItem.quantity}</p>

        <label htmlFor="quantity">Qty:</label>
        <select
          name="quantity"
          id="quantity"
          value={this.state.quantity}
          onChange={this.handleSubmit}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        <button
          type="delete"
          onClick={() => this.props.removeFromCart(cartItem.id)}
        >
          Remove From Cart
        </button>
      </li>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateQuantity: (cartItemId, quantity) =>
      dispatch(putCartItem(cartItemId, quantity)),
    removeFromCart: (id) => dispatch(deleteCartItem(id)),
  };
};

export default connect(null, mapDispatch)(CartItem);
