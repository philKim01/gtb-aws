import React from "react";

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
        <p>{`$${orderItem.price / 100}`}</p>
        <p>{orderItem.quantity}</p>
      </li>
    );
  }
}

