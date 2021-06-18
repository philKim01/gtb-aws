import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, fetchProductToDelete } from '../store/redux/products';
import { Link } from 'react-router-dom';
import CreateProduct from './CreateProduct';

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleClick(event) {
    event.preventDefault();
    this.props.getProductToDelete(event.target.value)
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {this.props.isAdmin ? (
          <div>
          <ul style={{ listStyleType: 'none' }}>
            {products.map((product) => {
              return (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} />
                  </Link>
                  <h3>{product.name}</h3>
                  <h5>${product.price}</h5>
                  <p>Stock: {product.stock}</p>
                  <button type="submit" value={product.id} onClick={this.handleClick}>Remove From Stock</button>
                  
                </li>
              );
            })}
          </ul>
          &nbsp; &nbsp; &nbsp;
          <h4>Add A New Product</h4>
          <CreateProduct />
          </div>
        ) : (
          <div>
          <ul style={{ listStyleType: 'none' }}>
            {products.map((product) => {
              return (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.imageUrl} />
                  </Link>
                  <h3>{product.name}</h3>
                  <h5>${product.price}</h5>
                  <p>Stock: {product.stock}</p>
                </li>
              );
            })}
          </ul>
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    products: state.products,
    isAdmin: state.auth.isAdmin
  };
};

const mapDisptach = (dispatch, { history }) => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    getProductToDelete: (id) => dispatch(fetchProductToDelete(id, history))
  };
};

export default connect(mapState, mapDisptach)(AllProducts);
