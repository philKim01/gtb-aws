import React from "react";
import penniesToDollars from "../Functions/PenniesToDollars";
/**
 * COMPONENT
 */
export class OrderItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    const orderItem = this.props.orderItem;
    return (
      <li key={orderItem.id}>
        <p>{orderItem.product.name}</p>
        <p>Price: {penniesToDollars(orderItem.price)}</p>
        <p>Qty: {orderItem.quantity}</p>
      </li>
    );
  }
}
