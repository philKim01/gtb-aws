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
