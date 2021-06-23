import React from "react";
import { connect } from "react-redux";
import { authenticateLogin } from "../store/redux/auth";

/**
 * COMPONENT
 */
class Login extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { name, displayName, handleSubmit, error } = this.props;

    return (
      <div className="sign-up">
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <label htmlFor="username">
              <small>E-mail</small>
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="please enter your e-mail"
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input name="password" type="password" required />
          </div>
          <br />

          <div>
            <button type="submit">{displayName}</button>
          </div>

          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.email.value.toLowerCase();
      const password = evt.target.password.value;
      dispatch(authenticateLogin(username, password, formName));
    },
  };
};

export default connect(mapLogin, mapDispatch)(Login);
