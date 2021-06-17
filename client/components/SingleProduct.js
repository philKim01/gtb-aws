import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../store/redux/singleProduct';

class SingleProduct extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }
  render() {
    const { product } = this.props;
    console.log(product)
    return (
      <div>
        <li key={product.id}>
          <img src={product.imageUrl} />
          <h3>{product.name}</h3>
          <h5>${product.price}</h5>
          <p>Stock: {product.inventory}</p>
        </li>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    product: state.product.product
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    getProduct: (id) => dispatch(fetchProduct(id))
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
