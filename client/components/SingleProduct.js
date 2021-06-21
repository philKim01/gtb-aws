import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/redux/singleProduct';
import { updatingProduct } from '../store/redux/products'

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: 0,
      stock: 0
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
      stock: product.stock
    });
  }
  render() {
    const { product } = this.props;
    return (
      <div>
        {this.props.isAdmin ? (
          <div>
            <img src={product.imageUrl} />
            <form id='update-product' onSubmit={this.handleSubmit}>
              <label htmlFor='productName'>Product Name:</label>
              <input
                type='text'
                value={this.state.name}
                onChange={(evt) => this.setState({ name: evt.target.value })}
              />
              <label htmlFor='description'>Description:</label>
              <input
                type='text'
                value={this.state.description}
                onChange={(evt) =>
                  this.setState({ description: evt.target.value })
                }
              />
              <label htmlFor='price'>Price:</label>
              <input
                type='integer'
                value={this.state.price}
                onChange={(evt) => this.setState({ price: evt.target.value })}
              />
              <label htmlFor='stock'>Stock:</label>
              <input
                type='integer'
                value={this.state.stock}
                onChange={(evt) => this.setState({ stock: evt.target.value })}
              />
              <button type='submit' onClick={this.handleSubmit}>
                Update Product
              </button>
            </form>
          </div>
        ) : (
          <li key={product.id}>
            <img src={product.imageUrl} />
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
            <p>Stock: {product.stock}</p>
          </li>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product.product,
    isAdmin: state.auth.isAdmin
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id)),
    updateProduct: (id, changesMade) => dispatch(updatingProduct(id, changesMade))

  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
