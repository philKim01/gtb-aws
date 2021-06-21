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
        const username = evt.target.username.value;
        const password = evt.target.password.value;
        dispatch(authenticateLogin(username, password, formName));
      },
    };
  };
  
  export default connect(mapLogin, mapDispatch)(Login);

