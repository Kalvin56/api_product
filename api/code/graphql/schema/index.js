const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type Product {
    _id: ID!
    name: String!
    code: String
    stock: Int!
  }

  input ProductInput {
    name: String!
    code: String!
    stock: Int!
  }

  input ProductGet {
    id: String
    code: String
    name: String
  }

  input ProductDelete {
    id: String
    code: String
  }

  input ProductUpdate {
    id: String
    name: String
    code: String
    stock: Int
  }

  input ProductStock {
    id: String
    code: String
    stock: Int!
  }

  type Query {
    products:[Product!],
    product(product:ProductGet):Product!
  }

  type Mutation {
    createProduct(product:ProductInput): Product,
    deleteProduct(product:ProductDelete): ID,
    updateProduct(product:ProductUpdate): Product,
    addStock(product:ProductStock): Product
    removeStock(product:ProductStock): Product
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)