import React from 'react';
import { connect } from 'react-redux';
import GuestOrderConfirmation from './GuestOrderConfirmation';
/**
 * COMPONENT
 */
class GuestCheckout extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      orderComplete: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      orderComplete: true
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const localCart = JSON.parse(window.localStorage.getItem('cart'));
    if (!localCart) {
      return <h1>Guest Cart Is Empty</h1>;
    }
    return (
      <React.Fragment>
        {!this.state.orderComplete ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor='email'>
                  <small>Email</small>
                </label>
                <input
                  name='email'
                  type='email'
                  placeholder='please enter your e-mail'
                  onChange={this.handleChange}
                  required
                />
              </div>
              <br />
              <div>
                <div>
                  <label htmlFor='firstName'>
                    <small>First Name</small>
                  </label>
                  <input
                    name='firstName'
                    type='text'
                    onChange={this.handleChange}
                    required
                  />

                  <label htmlFor='lastName'>
                    <small>Last Name</small>
                  </label>
                  <input
                    name='lastName'
                    type='text'
                    onChange={this.handleChange}
                    required
                  />

                  <br />

                  <label htmlFor='streetAddress'>
                    <small>Home Address</small>
                  </label>
                  <input
                    name='streetAddress'
                    type='text'
                    placeholder='street and number'
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    name='city'
                    type='text'
                    placeholder='city'
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    name='state'
                    type='text'
                    placeholder='state (e.g., NY)'
                    onChange={this.handleChange}
                    required
                  />
                  <input
                    name='zipCode'
                    type='text'
                    placeholder='zipcode'
                    onChange={this.handleChange}
                    required
                  />

                  <br />
                  <div>
                    <button type='submit'>Complete Order</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <GuestOrderConfirmation
            email={this.state.email}
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            streetAddress={this.state.streetAddress}
            city={this.state.city}
            state={this.state.state}
            zipCode={this.state.zipCode}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.auth.error
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
    }
  };
};

export default connect(mapSignup, mapDispatch)(GuestCheckout);
