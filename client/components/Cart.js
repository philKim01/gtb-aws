import React from "react";
import { connect } from "react-redux";
import { fetchCartItems, putCartItem } from "../store/redux/cart";
import { checkout } from "../store/redux/orders";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import UserOrderConfirmation from "./UserOrderConfirmation";
import penniesToDollars from "../Functions/PenniesToDollars";

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      total: 0,
      userOrderComplete: false,
      userCompleteCart: {},
    };
    this.updateTotal = this.updateTotal.bind(this);
  }

  componentDidMount() {
    this.props.getCart();

    if (!this.props.isLoggedIn) {
      const localCart = JSON.parse(window.localStorage.getItem("cart"));

      // logged in users dont use local state, only for guest users
      let cartTotal;
      if (!localCart) {
        cartTotal = 0;
      } else {
        cartTotal = localCart.total;
      }
      this.setState({
        total: cartTotal,
      });
    }
  }
  updateTotal() {
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    this.setState({
      total: localCart.total,
    });
  }

  cartRender() {
    const { total } = this.props;
    const cartItems = this.props.cartItems;
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    return this.props.isLoggedIn ? (
      <div className="cart-container">
        {" "}
        {cartItems.map((cartItem) => {
          return <CartItem key={cartItem.id} cartItem={cartItem} />;
        })}
        <p className="productDetails">{`Total: ${penniesToDollars(total)}`}</p>
        <button
          onClick={() => {
            this.setState({
              userOrderComplete: true,
              userCompleteCart: {
                total: this.props.total,
                cartItems: this.props.cartItems,
              },
            });
            this.props.markFulfilled(this.props.cartItems[0].orderId, true);
          }}
        >
          Place Order
        </button>
      </div>
    ) : (
      <div className="cart-container">
        {localCart.cartItems.map((cartItem) => {
          return (
            <CartItem
              key={cartItem.id}
              cartItem={cartItem}
              updateTotal={this.updateTotal}
            />
          );
        })}
        <p className="productDetails">{`Total: ${penniesToDollars(
          this.state.total
        )}`}</p>
        <div>
          <Link to="/guestcheckout">
            <button>Checkout</button>
          </Link>
        </div>
      </div>
    );
  }

  render() {
    const localCart = JSON.parse(window.localStorage.getItem("cart"));
    if (!localCart && !this.props.isLoggedIn) {
      return <h2 className="empty-cart">Cart is Empty</h2>;
    }
    if (this.props.isLoggedIn && this.props.total === 0) {
      return <h2 className="empty-cart">Cart is Empty</h2>;
    }
    if (!this.props.isLoggedIn) {
      if (localCart.total === 0) {
        return <h2 className="empty-cart">Cart is Empty</h2>;
      }
    }
    return (
      <React.Fragment>
        {!this.state.userOrderComplete ? (
          this.cartRender()
        ) : (
          <UserOrderConfirmation cart={this.state.userCompleteCart} />
        )}
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    cartItems: state.cart.cartItems,
    total: state.cart.total,
    isLoggedIn: !!state.auth.id,
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
