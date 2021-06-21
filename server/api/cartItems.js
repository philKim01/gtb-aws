const chalk = require("chalk");
const router = require("express").Router();
const {
  models: { Product, Order, OrderItem },
} = require("../db");
const { loggedIn } = require("./gatekeepingMiddleware");
module.exports = router;

// GET /api/cartItems
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
    res.json(cart.orderItems);
  } catch (err) {
    next(err);
  }
});

// POST /api/cartItems
router.post("/", loggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const currentCart = await Order.findOne({
      where: {
        fulfilled: false,
        userId: userId,
      },
    });

    const orderId = currentCart.id;
    const productId = parseInt(req.body.productId);
    const price = parseInt(req.body.price);

    const { id } = await OrderItem.create({
      quantity: 1,
      price,
      productId,
      orderId,
    });

    const addedCartItem = await OrderItem.findOne({
      where: {
        id,
      },
      include: { model: Product },
    });

    res.json(addedCartItem);
  } catch (err) {
    next(err);
  }
});

// PUT /api/cartItems/:id
router.put("/:id", loggedIn, async (req, res, next) => {
  try {
    const cartItemId = parseInt(req.params.id);
    const quantity = parseInt(req.body.quantity);
    let cartItem = await OrderItem.findByPk(cartItemId);
    cartItem = await cartItem.update({ quantity: quantity });

    const updatedCartItem = await OrderItem.findOne({
      where: {
        id: cartItemId,
      },
      include: { model: Product },
    });

    res.json(updatedCartItem);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/cartItems/:id
router.delete("/:id", loggedIn, async (req, res, next) => {
  try {
    const cartItemId = parseInt(req.params.id);
    const deletedCartItem = await OrderItem.findByPk(cartItemId);
    await deletedCartItem.destroy();
    res.json(deletedCartItem);
  } catch (err) {
    next(err);
  }
});
