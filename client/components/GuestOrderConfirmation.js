import React from "react";
import penniesToDollars from "../Functions/PenniesToDollars";

const GuestOrderConfirmation = (props) => {
  const localCart = JSON.parse(window.localStorage.getItem("cart"));
  const { email, firstName, lastName, streetAddress, state, city, zipCode } =
    props;
  const { total, cartItems } = localCart;

  window.localStorage.clear();
  return (
    <div className="order-confirmation">
      <h1>Order confirmed!</h1>
      <p>Email: {email}</p>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>
        Address: {streetAddress} {city}, {state} {zipCode}
      </p>
      {cartItems.map((cartItem) => {
        return (
          <p key={cartItem.id}>
            Item: {cartItem.name} Quantity: {cartItem.quantity} Unit Price:{" "}
            {penniesToDollars(cartItem.price)}
          </p>
        );
      })}
      <p>Total: {penniesToDollars(total)}</p>
    </div>
  );
};

export default GuestOrderConfirmation;
