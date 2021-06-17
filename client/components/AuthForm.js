import { render } from "enzyme";
import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../store/redux/auth";

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
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
          {this.props.location.pathname === "/" ||
          this.props.location.pathname === "/login" ? (
            <div>
              <button type="submit">{displayName}</button>
            </div>
          ) : (
            // </form>
            // <form onSubmit={handleSubmit} name={name}>

            <div>
              <div>
                <label htmlFor="firstName">
                  <small>First Name</small>
                </label>
                <input name="firstName" type="text" />
              </div>
              <div>
                <label htmlFor="lastName">
                  <small>Last Name</small>
                </label>
                <input name="lastName" type="text" />
              </div>
              <br />
              <div>
                <label htmlFor="address">
                  <small>Home Address</small>
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="street and number"
                />
                <input name="address" type="text" placeholder="city" />
                <input
                  name="address"
                  type="text"
                  placeholder="state (e.g., NY)"
                />
                <input name="address" type="text" placeholder="zipcode" />
              </div>
              <br />
              <div>
                <button type="submit">{displayName}</button>
              </div>
            </div>
          )}
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

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
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
