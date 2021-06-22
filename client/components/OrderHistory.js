//When we check out...
   //we want to update the order redux and database to mark current order as fulfilled and create a new unfulfilled order
   //we want to update the cart redux to fetch the new active cart, which should be empty
//Order history should render details of all fulfilled orders by using output of fetchOrders API

import React from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../store/redux/orders';

class Orders extends React.Component {
    constructor() {
      super();
    }
  
    componentDidMount() {
      this.props.getOrders();
    }
    render() {
        const { orders } = this.props.orders || [];
        return (
            {orders.map((order) => {
                return (
                      <React.Fragment>
            <ul style={{ listStyleType: "none" }}>
              {order.map((orderItem) => {
                return <CartItem key={orderItem.id} orderItem={orderItem} />;
              })}
            </ul>
            <p>{`$${total / 100}`}</p>
            <button type="submit" onClick={() => {
              this.props.markFulfilled(this.props.cartItems[0].orderId, true)
            }} >Place Order</button>
          </React.Fragment>
                )
              
            })}
          
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
      getOrders: () => dispatch(fetchOrders()),
      updateQuantity: (cartItemId, quantity) =>
        dispatch(putCartItem(cartItemId, quantity)),
        markFulfilled: (id, fulfilled) => dispatch(checkout(id, fulfilled)),
    };
  };
  
  export default connect(mapState, mapDisptach)(Orders);