const { User } = require("../Model/User");

const getAll = (req, res) => {
	User.find({})
		.then((result) => res.status(200).json(result))
		.catch((error) => res.status(400).json({
			message: error?.message || "Une erreur est survenue"
		}))
}

module.exports = {
	getAll,
}