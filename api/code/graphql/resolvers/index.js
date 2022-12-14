const { Product } = require("../../Model/Product")
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
  products: async () => {
    try {
      const productsFetched = await Product.find()
      return productsFetched.map(product => {
        return {
          ...product._doc,
          _id: product.id,
        }
      })
    } catch (error) {
      throw error
    }
  },

  product: async args => {
    try {
      let settings = {}
      const { id, code, name } = args.product

      if(id){
        settings = {_id : id}
      }else if(code){
        settings = {code : code}
      }else if(name){
        settings = {name : name}
      }

      const productFetched = await Product.findOne(settings)


      // si pas de produits dans notre BDD, on recherche dans l'API openfoodfacts
      let openfoodfacts = null
      if(!productFetched && code){
        await fetch(`https://world.openfoodfacts.org/api/v2/search?code=${code}&fields=code,product_name`)
          .then((response) => response.json())
          .then((data) => openfoodfacts = {
            name: data.products[0].product_name,
            code : code,
            stock : 0,
          });
      }
      if(openfoodfacts){
        return {
          ...openfoodfacts
        }
      }

      return {
        ...productFetched._doc,
      }
    } catch (error) {
      throw error
    }
  },

  createProduct: async args => {
    try {
      const { name, code, stock } = args.product
      const product = new Product({
        name,
        code,
        stock
      })
      const newProduct = await product.save()
      return { ...newProduct._doc, _id: newProduct.id }
    } catch (error) {
      throw error
    }
  },

  updateProduct: async args => {
    try {
      let settings = {}
      const { id, code } = args.product

      if(id){
        settings = {_id : id}
      }else if(code){
        settings = {code : code}
      }
      
      const updateProduct = await Product.findOneAndUpdate(settings, args.product, { new: true, runValidators: true })
      return { ...updateProduct._doc}
    } catch (error) {
      throw error
    }
  },

  addStock: async args => {
    try {
      let settings = {}
      const { id, code, stock } = args.product

      if(id){
        settings = {_id : id}
      }else if(code){
        settings = {code : code}
      }
      
      const updateProduct = await Product.findOneAndUpdate(settings, {$inc: { stock }})
      return { ...updateProduct._doc}
    } catch (error) {
      throw error
    }
  },

  removeStock: async args => {
    try {
      let settings = {}
      const { id, code, stock } = args.product

      if(id){
        settings = {_id : id}
      }else if(code){
        settings = {code : code}
      }

      const actualProduct = await Product.findOne(settings)
      if(actualProduct.stock - stock < 0){
        actualProduct.stock = 0;
      }else{
        actualProduct.stock -= stock;
      }
      const updateProduct = await actualProduct.save()
      return { ...updateProduct._doc}
    } catch (error) {
      throw error
    }
  },

  deleteProduct: async args => {
    try {
      let settings = {}
      const { id, code } = args.product

      if(id){
        settings = {_id : id}
      }else if(code){
        settings = {code : code}
      }

      const deletedProduct = await Product.findOneAndDelete(settings)

      return deletedProduct._id
    } catch (error) {
      throw error
    }
  },
}