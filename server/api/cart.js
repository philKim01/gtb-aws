const chalk = require("chalk");
const router = require("express").Router();
const {
  models: { Product, Order, OrderItem },
} = require("../db");
const { loggedIn } = require("./gatekeepingMiddleware");
module.exports = router;

// GET /api/cart
router.get("/", loggedIn, async (req, res, next) => {
  try {
    const id = req.user.id;
    const cart = await Order.findOne({
      where: {
        fulfilled: false,
        userId: id,
      },
      include: { model: OrderItem, include: { model: Product } },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// POST /api/cart
router.post("/:productId", loggedIn, async (req, res, next) => {
  try {
    const id = req.user.id;
    const currentCart = await Order.findOne({
      where: {
        fulfilled: false,
        userId: id,
      },
      include: { model: OrderItem, include: { model: Product } },
    });

    // Get current product price
    const productId = parseInt(req.params.productId);
    const product = await Product.findByPk(productId);

    // Check if item is already in cart, and if so, increment quantity
    const cartItemArray = currentCart.orderItems.filter((orderItem) => {
      return orderItem.product.id === productId;
    });
    if (cartItemArray.length === 1) {
      let newQuantity = cartItemArray[0].quantity + 1;
      let cartItem = await OrderItem.findByPk(cartItemArray[0].id);
      cartItem = await cartItem.update({ quantity: newQuantity });
    }

    // Otherwise, create a new cart item, and add it to the cart
    else {
      await OrderItem.create({
        quantity: 1,
        price: product.price,
        productId: product.id,
        orderId: currentCart.id,
      });
    }

    const newCart = await Order.findOne({
      where: {
        fulfilled: false,
        userId: id,
      },
      include: { model: OrderItem, include: { model: Product } },
    });

    res.json(newCart);

  } catch (err) {
    next(err);
  }
});
