const { Product } = require("../Model/Product");

const create = (req, res) => {
	Product.create(req.body)
		.then((result) => res.status(201).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue",
		}))
}

const getId = (req, res) => {
	let id = req.params.id;
	Product.findOne({ _id: id })
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(404).json({
			messsage: `le produit ${id} n'a pas été trouvé`
		}))
}

const getAll = (req, res) => {
	Product.find({})
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

const put = (req, res) => {
	Product.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true, runValidators: true })
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

const deleteId = (req, res) => {
	let id = req.params.id;
	Product.findOneAndDelete({ _id: id })
		.then((result) => res.status(204).json({}))
		.catch((error) => res.status(404).json({
			messsage: `le produit ${id} n'a pas été trouvé`
		}))
}

const addStock = (req, res) => {
	let id = req.params.id;
	Product.findOneAndUpdate({ _id: id }, {$inc: { stock: req.body.stock }})
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

const removeStock = (req, res) => {
	let id = req.params.id;
	let stock = req.body.stock;
	Product.findOne({_id: id})
		.then((result) => {
			if(result.stock - stock < 0){
				res.status(400).json({
					message: "Le stock ne peut pas être inférieur à 0"
				});
			}
			result.stock -= stock;
				result.save()
					.then((result) => res.status(200).json(result))
					.catch((error) => res.status(400).json({
						message: error?.message || "Une erreur est survenue"
					}))
		})
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

module.exports = {
    create,
	getId,
	getAll,
	put,
	deleteId,
	addStock,
	removeStock,
}