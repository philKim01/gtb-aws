import React from "react";
import { connect } from "react-redux";
import { authenticateSignup } from "../store/redux/auth";

/**
 * COMPONENT
 */
class Signup extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { name, displayName, handleSubmit, error } = this.props;

    return (
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="username">
                <small>Username</small>
              </label>
              <input
                name="username"
                type="text"
                placeholder="please enter your e-mail"
              />
            </div>
            <div>
              <label htmlFor="password">
                <small>Password</small>
              </label>
              <input name="password" type="password" />
            </div>
            <br />
              <div>
                <div>
                <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input
              name="firstName"
              type="text"
            />

            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input
              name="lastName"
              type="text"
            />

            <br />

            <label htmlFor="streetAddress">
              <small>Home Address</small>
            </label>
            <input
              name="streetAddress"
              type="text"
              placeholder="street and number"
            />
            <input
              name="city"
              type="text"
              placeholder="city"
            />
            <input
              name="state"
              type="text"
              placeholder="state (e.g., NY)"
            />
            <input
              name="zipCode"
              type="text"
              placeholder="zipcode"
            />

            <br />
                <div>
                  <button type="submit">{displayName}</button>
                </div>
              </div>
            {error && error.response && <div> {error.response.data} </div>}
            </div>
          </form>
        </div>
      );
  }
}

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
    return {
      handleSubmit(evt) {
        evt.preventDefault();
        const formName = evt.target.name;
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        const firstName = evt.target.firstName.value;
        const lastName = evt.target.lastName.value;
        const streetAddress = evt.target.streetAddress.value;
        const city = evt.target.city.value;
        const state = evt.target.state.value;
        const zipCode = evt.target.zipCode.value;
        dispatch(
          authenticateSignup(
            username,
            password,
            firstName,
            lastName,
            streetAddress,
            city,
            state,
            zipCode,
            formName
          )
        );
      },
    };
  };

  export default connect(mapSignup, mapDispatch)(Signup);