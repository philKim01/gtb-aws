const router = require('express').Router()
const { models: { Product }} = require('../db')
const { loggedIn, isAdmin } = require('./gatekeepingMiddleware')
module.exports = router


// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// UPDATE /api/products/:id
router.put('/:id', loggedIn, isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingProduct = await Product.findByPk(id);
    if (!updatingProduct) {
      res.sendStatus(404);
      return;
    }
    const { name, description, price, stock } = req.body;
    await updatingProduct.update({
      name,
      description,
      price,
      stock
    });
    res.status(200).send(updatingProduct);
  } catch (err) {
    next(err);
  }
});
