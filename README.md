## Technologies
Node.js / Express / MongoDB / Mongoose

## Configuration
- Créer un fichier .env à la racine, le compléter en utilisant le template .env.template
- Créer un fichier mongo-init.js dans le dossier docker-entrypoint-initdb.d, le compléter en utilisant le template mongo-init-template
- Créer un fichier .env dans api/code, le compléter en utilisant le template .env.template
- Lancer `docker-compose up`

# Documentation

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
