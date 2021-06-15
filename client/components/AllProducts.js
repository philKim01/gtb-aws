import React from 'react'
import {connect} from 'react-redux'
import {fetchToys as fetchProducts } from "../store/redux";
import { Link } from "react-router-dom"

/**
 * COMPONENT
 */
class AllProducts extends React.Component {
  constructor() {
    super()
    //This is in preparation for some handlClick events
  }

componentDidMount() {
  this.props.getProducts();
}

render() {
  return (
    <ul style={{listStyleType: 'none'}}>
      {this.props.toys.map((product) => {
        return (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
            <img src={product.imageUrl} />
            </Link>
            <h3>{product.name}</h3>
            <h5>${product.price}</h5>
            <p>Stock: {product.inventory}</p>
          </li>
        )
      })}
    </ul>
  );
}
}

const mapState = state => {
  return {
    toys: state.toys.toys,
  }
}

const mapDisptach = (dispatch, { history }) => {
  return {
    getProducts: () => dispatch(fetchProducts())
  }
  
}

export default connect(mapState, mapDisptach)(AllProducts);