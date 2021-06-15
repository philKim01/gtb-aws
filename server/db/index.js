//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/user");
const Product = require("./models/product");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");

//Associations
User.hasOne(Cart);
Cart.belongsTo(User);

CartItem.belongsTo(Product);
Product.hasOne(CartItem);

CartItem.belongsTo(Cart);
Cart.hasMany(CartItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    Cart,
    CartItem,
  },
};
