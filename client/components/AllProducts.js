import React from "react";
import { connect } from "react-redux";
import { fetchProducts, fetchProductToDelete } from "../store/redux/products";
import { Link } from "react-router-dom";
import CreateProduct from "./CreateProduct";
import { postCartItem, putCartItem } from "../store/redux/cart";
import penniesToDollars from "../Functions/PenniesToDollars";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleClick(event) {
    event.preventDefault();
    this.props.getProductToDelete(event.target.value);
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {this.props.isAdmin ? (
          <div>
            <ul style={{ listStyleType: "none" }}>
              {products.map((product) => {
                return (
                  <li key={product.id}>
                    <Link to={`/products/${product.id}`}>
                        <img src={product.imageUrl} />
                    </Link>
                    <h3>{product.name}</h3>
                    <h5>{penniesToDollars(product.price)}</h5>
                    <p>Stock: {product.stock}</p>
                    <button
                      type="submit"
                      value={product.id}
                      onClick={this.handleClick}
                    >
                      Remove From Stock
                    </button>
                    <br />
                  </li>
                );
              })}
            </ul>
            &nbsp; &nbsp; &nbsp;
            <h4>
              Add A New Product <span>(** = required)</span>
            </h4>
            <CreateProduct />
          </div>
        ) : (
          <div>
            <Grid container spacing={10} justify="center">
              {products.map((product) => {
                return (
                  <Grid item key={product.id}>
                    <h3 className="productName">{product.name}</h3>
                    <p className="productDetails">{penniesToDollars(product.price)}</p>
                    <Link to={`/products/${product.id}`}>
                      <img src={product.imageUrl} />
                    </Link>
                    <Button
                      variant="contained"
                      color="default"
                      type="addToCart"
                      onClick={() => {
                        let message;
                        if (product.name === "Beanie Babies") {
                          message = "A Beanie Baby has been added to your cart";
                        } else if (product.name === "GoGo's Crazy Bones") {
                          message =
                            "A pack of GoGo's Crazy Bones have been added to your cart";
                        } else if (product.name === "Etch-a-Sketch") {
                          message =
                            "An Etch-a-Sketch has been added to your cart";
                        } else {
                          message = `A ${product.name} has been added to your cart`;
                        }
                        window.alert(message);
                        if (this.props.isLoggedIn) {
                          const isInCart = this.props.cartItems.filter(
                            (cartItem) => {
                              return cartItem.product.id === product.id;
                            }
                          );
                          if (isInCart.length === 0) {
                            this.props.addToCart(product.id, product.price);
                          } else {
                            this.props.updateQuantity(
                              isInCart[0].id,
                              isInCart[0].quantity + 1
                            );
                          }
                        } else {
                          let localCart = window.localStorage.getItem("cart");
                          if (!localCart) {
                            const productToAdd = Object.assign(product);
                            productToAdd.quantity = 1;
                            const initialCart = {
                              total: product.price,
                              cartItems: [productToAdd],
                            };

                            window.localStorage.setItem(
                              "cart",
                              JSON.stringify(initialCart)
                            );
                          } else {
                            localCart = JSON.parse(
                              window.localStorage.getItem("cart")
                            );
                            localCart.total += product.price;

                            const isInLocalCart = localCart.cartItems.filter(
                              (cartItem) => {
                                return cartItem.id === product.id;
                              }
                            );
                            if (isInLocalCart.length) {
                              isInLocalCart[0].quantity += 1;
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(localCart)
                              );
                            } else {
                              const productToAdd = Object.assign(product);
                              productToAdd.quantity = 1;
                              localCart.cartItems.push(productToAdd);
                              window.localStorage.setItem(
                                "cart",
                                JSON.stringify(localCart)
                              );
                            }
                          }
                        }
                      }}
                    >
                      Add To Cart
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
    cartItems: state.cart.cartItems,
  };
};

const mapDisptach = (dispatch, { history }) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getProductToDelete: (id) => dispatch(fetchProductToDelete(id, history)),
    addToCart: (productId, price) => dispatch(postCartItem(productId, price)),
    updateQuantity: (cartItemId, quantity) =>
      dispatch(putCartItem(cartItemId, quantity)),
  };
};

export default connect(mapState, mapDisptach)(AllProducts);
