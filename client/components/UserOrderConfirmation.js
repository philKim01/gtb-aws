import React from "react";
import { connect } from "react-redux";
import { getUser } from "../store/redux/user";

class UserOrderConfirmation extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await this.props.getUser();
  }

  render() {
    let { cartItems, total } = this.props.cart;
    let { username, firstName, lastName, streetAddress, city, state, zipCode } =
      this.props.user;
    return (
      <React.Fragment>
        <h1>Order confirmed!</h1>
        <p>Email: {username}</p>
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>
          Address: {streetAddress} {city}, {state} {zipCode}
        </p>
        {cartItems.map((cartItem) => {
          return (
            <p key={cartItem.id}>
              Item: {cartItem.product.name} Quantity: {cartItem.quantity} Unit
              Price: ${cartItem.price / 100}
            </p>
          );
        })}
        <p>Total: ${total / 100}</p>
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  };
};

export default connect(mapState, mapDispatch)(UserOrderConfirmation);
