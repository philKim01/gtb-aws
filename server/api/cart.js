const router = require("express").Router();
const {
  models: { Product, Order, OrderItem },
} = require("../db");
module.exports = router;

// GET /api/cart
router.get("/", async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        fulfilled: false,
      },
      include: { model: OrderItem, include: { model: Product } },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});
