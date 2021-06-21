import React from 'react';
import { connect } from 'react-redux';
import { fetchCartItems, putCartItem } from '../store/redux/cart';
import CartItem from './CartItem';

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

    const localCart = JSON.parse(window.localStorage.getItem('cart'))
    if(!localCart && !this.props.loggedIn){
      return (<h2>Cart is Empty</h2>)
    }
    return (
      <React.Fragment>
        {this.props.isLoggedIn ? (
          <React.Fragment>
            {' '}
            <ul style={{ listStyleType: 'none' }}>
              {cartItems.map((cartItem) => {
                return <CartItem key={cartItem.id} cartItem={cartItem} />;
              })}
            </ul>
            <p>{`$${total / 100}`}</p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {localCart.cartItems.map((cartItem) => {
              return <CartItem key={cartItem.id} cartItem={cartItem} />
            })}
            <p>{`$${localCart.total / 100}`}</p>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    cartItems: state.cart.cartItems,
    total: state.cart.total,
    isLoggedIn: !!state.auth.id
  };
};

const mapDisptach = (dispatch) => {
  return {
    getCart: () => dispatch(fetchCartItems()),
    updateQuantity: (cartItemId, quantity) =>
      dispatch(putCartItem(cartItemId, quantity))
  };
};

export default connect(mapState, mapDisptach)(Cart);
