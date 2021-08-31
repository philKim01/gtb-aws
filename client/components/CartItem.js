import React from "react";
import { connect } from "react-redux";
import { deleteCartItem, putCartItem } from "../store/redux/cart";
import penniesToDollars from "../Functions/PenniesToDollars";

/**
 * COMPONENT
 */
class CartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      quantity: this.props.cartItem.quantity,
    });
  }

  handleChange(event) {
    this.setState({
      quantity: event.target.value,
    });
    if (this.props.isLoggedIn) {
      this.props.updateQuantity(this.props.cartItem.id, event.target.value);
    } else {
      const localCart = JSON.parse(window.localStorage.getItem("cart"));
      const updatedLocalCartItems = localCart.cartItems.map((cartItem) => {
        if (cartItem.id === this.props.cartItem.id) {
          cartItem.quantity = event.target.value;
        }
        return cartItem;
      });
      localCart.total = updatedLocalCartItems.reduce((total, cartItem) => {
        return total + cartItem.price * cartItem.quantity;
      }, 0);
      localCart.cartItems = updatedLocalCartItems;
      window.localStorage.setItem("cart", JSON.stringify(localCart));

      this.props.updateTotal();
    }
  }

  render() {
    const cartItem = this.props.cartItem;
    return (
      <React.Fragment>
        {this.props.isLoggedIn ? (
          <div key={cartItem.id}>
            <p className="productName">{cartItem.product.name}</p>
            <p className="productDetails">{penniesToDollars(cartItem.price)}</p>
            <div className="qty-container">
              <label className="productDetails" htmlFor="quantity">
                Qty:{" "}
              </label>
              <select
                name="quantity"
                id="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
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
            </div>
          </div>
        ) : (
          <div key={cartItem.id}>
            <p className="productName">{cartItem.name}</p>
            <p className="productDetails">{penniesToDollars(cartItem.price)}</p>
            <div className="qty-container">
              <label className="productDetails" htmlFor="quantity">
                Qty:{" "}
              </label>
              <select
                name="quantity"
                id="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
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
                onClick={() => {
                  const guestCart = JSON.parse(
                    window.localStorage.getItem("cart")
                  );
                  const newGuestCartItems = guestCart.cartItems.filter(
                    (guestCartItem) => {
                      return guestCartItem.id !== cartItem.id;
                    }
                  );
                  window.localStorage.setItem(
                    "cart",
                    JSON.stringify({
                      total: (guestCart.total -=
                        cartItem.price * cartItem.quantity),
                      cartItems: newGuestCartItems,
                    })
                  );
                  this.props.updateTotal();
                }}
              >
                Remove From Cart
              </button>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};
const mapDispatch = (dispatch) => {
  return {
    updateQuantity: (cartItemId, quantity) =>
      dispatch(putCartItem(cartItemId, quantity)),
    removeFromCart: (id) => dispatch(deleteCartItem(id)),
  };
};

export default connect(mapState, mapDispatch)(CartItem);
