import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/redux/singleProduct";
import { updatingProduct } from "../store/redux/products";
import { postCartItem, putCartItem } from "../store/redux/cart";
import penniesToDollars from "../Functions/PenniesToDollars";
import Button from "@material-ui/core/Button";

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      price: 0,
      stock: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSingleProductState = this.updateSingleProductState.bind(this);
  }

  updateSingleProductState(id, changesMade) {
    this.setState(changesMade);
    this.props.updateStudent(id, changesMade);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct(this.props.product.id, this.state);
  }

  async componentDidMount() {
    await this.props.getProduct(this.props.match.params.id);
    const { product } = this.props;
    this.setState({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
    });
  }
  render() {
    const { product } = this.props;
    return (
      <React.Fragment>
        {this.props.isAdmin ? (
          <div>
            <img src={product.imageUrl} />
            <form id="update-product" onSubmit={this.handleSubmit}>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                value={this.state.name}
                onChange={(evt) => this.setState({ name: evt.target.value })}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                value={this.state.description}
                onChange={(evt) =>
                  this.setState({ description: evt.target.value })
                }
              />
              <label htmlFor="price">Price:</label>
              <input
                type="integer"
                value={penniesToDollars(this.state.price)}
                onChange={(evt) => this.setState({ price: evt.target.value })}
              />
              <label htmlFor="stock">Stock:</label>
              <input
                type="integer"
                value={this.state.stock}
                onChange={(evt) => this.setState({ stock: evt.target.value })}
              />
              <button type="submit" onClick={this.handleSubmit}>
                Update Product
              </button>
            </form>
          </div>
        ) : (
          <div className="singleProduct" key={product.id}>
            <h3 className="productName">{product.name}</h3>
            <p className="productDetails">{penniesToDollars(product.price)}</p>
            <img src={product.imageUrl} />
            <p className="productDetails">{product.description}</p>
            <Button
              variant="contained"
              color="default"
              type="addToCart"
              onClick={() => {
                if (this.props.isLoggedIn) {
                  const isInCart = this.props.cartItems.filter((cartItem) => {
                    return cartItem.product.id === product.id;
                  });
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
                    localCart = JSON.parse(window.localStorage.getItem("cart"));
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
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product.product,
    isAdmin: state.auth.isAdmin,
    cartItems: state.cart.cartItems,
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    updateProduct: (id, changesMade) =>
      dispatch(updatingProduct(id, changesMade)),
    addToCart: (productId, price) => dispatch(postCartItem(productId, price)),
    updateQuantity: (cartItemId, quantity) =>
      dispatch(putCartItem(cartItemId, quantity)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
