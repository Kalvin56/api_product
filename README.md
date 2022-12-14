# Technologies
Node.js / Express / MongoDB / Mongoose

# Configuration
- Créer un fichier .env à la racine, le compléter en utilisant le template .env.template
- Créer un fichier mongo-init.js dans le dossier docker-entrypoint-initdb.d, le compléter en utilisant le template mongo-init-template
- Créer un fichier .env dans api/code, le compléter en utilisant le template .env.template
- Lancer `docker-compose up`

# Documentation API GRAPHQL

Lien : http://localhost:8088/graphql

## Créer un produit

```sh
mutation {
    createProduct (product: {name: "abricot", code: "8887-77", stock: 10}) {
        name,
        code,
        stock
    }
}
```

Exemple réponse :
```sh
{
  "data": {
    "createProduct": {
      "name": "abricot",
      "code": "8887-77",
      "stock": 10
    }
  }
}
```

## Récupérer un produit (code, id ou name)

### Code

```sh
query {
    product (product: {code: "8887-77"}) {
        _id,
        name,
        code,
        stock
    }
}
```

Exemple réponse :
```sh
{
  "data": {
    "product": {
      "_id": "639992584572b77ed68b8bc5",
      "name": "abricot",
      "code": "8887-77",
      "stock": 10
    }
  }
}
```

Si le code est renseigné, et que aucun produit n'est trouvé en base de données, le produit renvoyé va provenir de Openfoodfacts

```sh
query {
    product (product: {code: "8024884500403"}) {
        name,
        code,
        stock
    }
}
```

Exemple réponse :
```sh
{
  "data": {
    "product": {
      "name": "Courmayeur - Eau minérale naturelle",
      "code": "8024884500403",
      "stock": 0
    }
  }
}
```

### Id

```sh
query {
    product (product: {id: "639992584572b77ed68b8bc5"}) {
        _id,
        name,
        code,
        stock
    }
}
```

### Name

```sh
{
    product(product: {name: "abricot"}) {
        _id,
        name
        code
        stock
    }
}
```

## Récupérer tous les produis

```sh
query {
    products {
        _id,
        name,
        code,
        stock
    }
}
```

Exemple réponse :
```sh
{
  "data": {
    "products": [
      {
        "_id": "637f8d8cfd7fc0136c98b8b8",
        "name": "boisson",
        "code": null,
        "stock": 8350
      },
      {
        "_id": "637fabce5e2c83d037a2f7cc",
        "name": "pomme",
        "code": null,
        "stock": 15
      },
      {
        "_id": "6380a0c9abf2d58736f8876d",
        "name": "kiwi",
        "code": null,
        "stock": 10
      },
      {
        "_id": "63998f19f1a211274ca55b1f",
        "name": "kiwi",
        "code": null,
        "stock": 10
      },
      {
        "_id": "639992584572b77ed68b8bc5",
        "name": "abricot",
        "code": "8887-77",
        "stock": 10
      },
      {
        "_id": "6399a69a874ba7c89a958324",
        "name": "abricot",
        "code": "8887-77",
        "stock": 10
      }
    ]
  }
}
```

## Supprimer un produit (code ou id)

### Code

```sh
mutation {
    deleteProduct(product: {code: "8887-77"})
}
```

Exemple réponse :
```sh
{
  "data": {
    "deleteProduct": "639992584572b77ed68b8bc5"
  }
}
```

### Id

```sh
mutation {
    deleteProduct(product: {id: "639992584572b77ed68b8bc5"})
}
```

Exemple réponse :
```sh
{
  "data": {
    "deleteProduct": "639992584572b77ed68b8bc5"
  }
}
```

# Documentation API PRODUCTS

## Créer un produit

```sh
POST /api/products
```

Exemple body : 
```sh
{
	"name": "kiwi",
	"stock": 10
}
```

Exemple réponse : 
```sh
{
    "name": "kiwi",
    "stock": 10,
    "_id": "6380a0c9abf2d58736f8876d",
    "__v": 0
}
```

## Récupérer un produit

```sh
GET /api/products/:id
```

Exemple réponse : 
```sh
{
    "_id": "6380a0c9abf2d58736f8876d",
    "name": "kiwi",
    "stock": 10,
    "__v": 0
}
```

## Récupérer tous les produit

```sh
GET /api/products
```

Example response : 
```sh
[
    {
        "_id": "637f8d8cfd7fc0136c98b8b8",
        "name": "boisson",
        "stock": 100,
        "__v": 0
    },
    {
        "_id": "637fabce5e2c83d037a2f7cc",
        "name": "pomme",
        "stock": 15,
        "__v": 0
    },
    {
        "_id": "6380a0c9abf2d58736f8876d",
        "name": "kiwi",
        "stock": 10,
        "__v": 0
    }
]
```

## Mettre à jour un produit

```sh
PUT /api/products
```

Exemple body : 
```sh
{
	"_id": "637f8d8cfd7fc0136c98b8b8",
    "name": "boisson",
    "stock": 400
}
```

Exemple réponse : 
```sh
{
    "_id": "637f8d8cfd7fc0136c98b8b8",
    "name": "boisson",
    "stock": 400,
    "__v": 0
}
```

## Supprimer un produit

```sh
DELETE /api/products/:id
```

## Augmenter le stock d'un produit

```sh
PATCH /api/products/:id/stock/add
```

Exemple body : 
```sh
{
    "stock": 10
}
```

Exemple réponse : 
```sh
{
    "_id": "637f8d8cfd7fc0136c98b8b8",
    "name": "boisson",
    "stock": 410,
    "__v": 0
}
```

## Diminuer le stock d'un produit

```sh
PATCH /api/products/:id/stock/remove
```

Exemple body : 
```sh
{
    "stock": 10
}
```

Exemple réponse : 
```sh
{
    "_id": "637f8d8cfd7fc0136c98b8b8",
    "name": "boisson",
    "stock": 390,
    "__v": 0
}
