import React from "react";
import { connect } from "react-redux";
import { fetchNewProduct } from "../store/redux/products";

class CreateProduct extends React.Component {
    constructor() {
        super()
        this.state = {
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (
            this.state.name === "" ||
            this.state.price === "" ||
            this.state.stock === ""
        ) {
            window.alert("Please enter the required fields!")
        }
        this.props.createProduct({ ...this.state})
        this.setState({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
        })
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    render() {
        const { name, description, price, category, stock } = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="name" className="form-label">Product Name: </label>
            <input
              name="name"
              value={name}
              placeholder="**"
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="description" className="form-label">Product Description: </label>
            <input
              name="description"
              value={description}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="price" className="form-label">Price: </label>
            <input
              name="price"
              value={price}
              placeholder="**(eg, $12.50 is 1250)"
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="category" className="form-label">Category: </label>
            <input
              name="category"
              value={category}
              placeholder="(e.g.,'technology')"
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="stock" className="form-label">
              Stock:
            </label>
            <input name="stock" value={stock} placeholder="**" onChange={this.handleChange} />
            <br />
            <button type="submit">Add Product</button>
          </form>
        );
      }
}

const mapDisptach = (dispatch) => ({
    createProduct: (product) => dispatch(fetchNewProduct(product))
})

export default connect(null, mapDisptach)(CreateProduct);