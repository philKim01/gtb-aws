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

//DELETE api/products/:id
router.delete("/:id", loggedIn, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//POST api/products
router.post("/", loggedIn, isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});
