import React from 'react';
import penniesToDollars from '../Functions/PenniesToDollars';
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
        <p>{penniesToDollars(orderItem.price)}</p>
        <p>{orderItem.quantity}</p>
      </li>
    );
  }
}
