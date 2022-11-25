const express = require('express');
const router = express.Router();
const product = require("./Controller/Product");

router.post('/products', product.create)
router.get('/products', product.getAll)
router.get('/products/:id', product.getId)
router.delete('/products/:id', product.deleteId)
router.put('/products', product.put)
router.patch('/products/:id/stock/add', product.addStock)
router.patch('/products/:id/stock/remove', product.removeStock)

module.exports = router;