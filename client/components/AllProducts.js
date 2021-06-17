import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/redux/products';
import { Link } from 'react-router-dom';

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor() {
    super();
    //This is in preparation for some handlClick events
  }

  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        {this.props.isAdmin ? (
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
        ) : (
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
    getProducts: () => dispatch(fetchProducts())
  };
};

export default connect(mapState, mapDisptach)(AllProducts);
