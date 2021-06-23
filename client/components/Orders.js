//When we check out...
//we want to update the order redux and database to mark current order as fulfilled and create a new unfulfilled order
//we want to update the cart redux to fetch the new active cart, which should be empty
//Order history should render details of all fulfilled orders by using output of fetchOrders API

import React from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../store/redux/orders";
import { OrderItem } from "./OrderItem";

class Orders extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getOrders();
  }
  render() {
    const orders = this.props.orders || [];
    return (
      <div className="orders">
        {orders.map((order) => {
          if (order.fulfilled) {
            return (
              <React.Fragment key={order.id}>
                <p>Order Confirmation # {order.id}</p>
                <ul style={{ listStyleType: "none" }}>
                  {order.orderItems.map((orderItem) => {
                    return (
                      <OrderItem key={orderItem.id} orderItem={orderItem} />
                    );
                  })}
                </ul>
                {/* <p>{`$${total / 100}`}</p> Consider adding total to orders model*/}
              </React.Fragment>
            );
          }
        })}
      </div>
    );
  }
  ß;
}

const mapState = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getOrders: () => dispatch(fetchOrders()),
  };
};

export default connect(mapState, mapDispatch)(Orders);
