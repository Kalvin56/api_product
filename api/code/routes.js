const express = require('express');
const router = express.Router();
const product = require("./Controller/Product");
const user = require("./Controller/User");
const auth = require("./Controller/Auth");
const middleware = require('./Middlewares');

router.post('/products', product.create)
router.get('/products', product.getAll)
// router.get('/products', [middleware.verifyToken], product.getAll)
router.get('/products/:id', product.getId)
router.delete('/products/:id', product.deleteId)
router.put('/products', product.put)
router.patch('/products/:id/stock/add', product.addStock)
router.patch('/products/:id/stock/remove', product.removeStock)

router.get('/users', user.getAll)

router.post('/register', auth.register)
router.post('/login', auth.login)

module.exports = router;