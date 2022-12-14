const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  code: String,
  stock: {type: Number, min: 0},
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = {
    Product,
    ProductSchema
}