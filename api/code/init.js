const { Role } = require("./Model/Role");

const initial = () => {
	Role.estimatedDocumentCount((err, count) => {
	  if (!err && count === 0) {
		new Role({
		  name: "USER"
		}).save(err => {
		  if (err) {
			console.log("error", err);
		  }
  
		  console.log("added 'USER' to roles collection");
		});
  
		new Role({
		  name: "ADMIN"
		}).save(err => {
		  if (err) {
			console.log("error", err);
		  }
  
		  console.log("added 'ADMIN' to roles collection");
		});
	  }
	});
}

module.exports = {
    initial,
}