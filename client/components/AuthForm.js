// import { render } from "enzyme";
// import React from "react";
// import { connect } from "react-redux";
// import { authenticateLogin, authenticateSignup } from "../store/redux/auth";

// /**
//  * COMPONENT
//  */
// class AuthForm extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       username: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       streetAddress: "",
//       city: "",
//       state: "",
//       zipCode: Number(""),
//     };

//     this.handleChange = this.handleChange.bind(this);
//   }

//   handleChange(event) {
//     this.setState({
//       [event.target.name]: event.target.value,
//     });
//   }

//   render() {
//     const { name, displayName, handleSubmitLogin, handleSubmitSignup, error } =
//       this.props;

//     const { username, password, firstName, lastName, streetAddress, city, state, zipCode } =
//       this.state;

//     return (
//       <div>
//         <div>
//           <label htmlFor="username">
//             <small>Username</small>
//           </label>
//           <input
//             name="username"
//             type="text"
//             value={username}
//             placeholder="please enter your e-mail"
//             onChange={this.handleChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">
//             <small>Password</small>
//           </label>
//           <input name="password" type="password" vaule={password} onChange={this.handleChange}/>
//         </div>
//         <br />
//         {this.props.location.pathname === "/" ||
//         this.props.location.pathname === "/login" ? (
//           <form onSubmit={handleSubmitLogin} name={name}>
//             <button type="submit">{displayName}</button>
//           </form>
//         ) : (
//           <form onSubmit={handleSubmitSignup}>
            // <label htmlFor="firstName">
            //   <small>First Name</small>
            // </label>
            // <input
            //   name="firstName"
            //   type="text"
            //   value={firstName}
            //   onChange={this.handleChange}
            // />

            // <label htmlFor="lastName">
            //   <small>Last Name</small>
            // </label>
            // <input
            //   name="lastName"
            //   type="text"
            //   value={lastName}
            //   onChange={this.handleChange}
            // />

            // <br />

            // <label htmlFor="streetAddress">
            //   <small>Home Address</small>
            // </label>
            // <input
            //   name="streetAddress"
            //   type="text"
            //   value={streetAddress}
            //   placeholder="street and number"
            //   onChange={this.handleChange}
            // />
            // <input
            //   name="city"
            //   type="text"
            //   placeholder="city"
            //   value={city}
            //   onChange={this.handleChange}
            // />
            // <input
            //   name="state"
            //   type="text"
            //   value={state}
            //   placeholder="state (e.g., NY)"
            //   onChange={this.handleChange}
            // />
            // <input
            //   name="zipCode"
            //   type="text"
            //   value={zipCode}
            //   placeholder="zipcode"
            //   onChange={this.handleChange}
            // />

            // <br />

//             <button type="submit">{displayName}</button>
//           </form>
//         )}
//         {error && error.response && <div> {error.response.data} </div>}
//       </div>
//     );
//   }
// }

// /**
//  * CONTAINER
//  *   Note that we have two different sets of 'mapStateToProps' functions -
//  *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
//  *   function, and share the same Component. This is a good example of how we
//  *   can stay DRY with interfaces that are very similar to each other!
//  */
// const mapLogin = (state) => {
//   return {
//     name: "login",
//     displayName: "Login",
//     error: state.auth.error,
//   };
// };

// const mapSignup = (state) => {
//   return {
//     name: "signup",
//     displayName: "Sign Up",
//     error: state.auth.error,
//   };
// };

// const mapDispatchLogin = (dispatch) => {
//   return {
//     handleSubmitLogin(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       dispatch(authenticateLogin(username, password, formName));
//     },
//   };
// };

// const mapDispatchSignUp = (dispatch) => {
//   return {
//     handleSubmitSignup(evt) {
//       evt.preventDefault();
//       const formName = evt.target.name;
//       const username = evt.target.username.value;
//       const password = evt.target.password.value;
//       const firstName = evt.target.firstName.value;
//       const lastName = evt.target.lastName.value;
//       const streetAddress = evt.target.streetAddress.value;
//       const city = evt.target.city.value;
//       const state = evt.target.state.value;
//       const zipCode = evt.target.zipCode.value;
//       dispatch(
//         authenticateSignup(
//           username,
//           password,
//           firstName,
//           lastName,
//           streetAddress,
//           city,
//           state,
//           zipCode,
//           formName
//         )
//       );
//     },
//   };
// };

// export const Login = connect(mapLogin, mapDispatchLogin)(AuthForm);
// export const Signup = connect(mapSignup, mapDispatchSignUp)(AuthForm);
