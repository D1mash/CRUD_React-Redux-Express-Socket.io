const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (socket, data) => {
	// Validate request
	if (!data.title) {
		socket.emit("createTutorial", data);
		return;
	}

	// Create a Tutorial
	const tutorial = {
		title: data.title,
		description: data.description,
		published: data.published ? data.published : false,
	};

	// Save Tutorial in the database
	Tutorial.create(tutorial)
		.then(data => {
			socket.emit("createTutorial", data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Tutorial.",
			});
		});
};

// Retrieve all Tutorials from the database.
exports.findAll = socket => {
	// const title = req.query.title;
	// var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

	Tutorial.findAll({
		where: null,
	})
		.then(data => {
			socket.emit("fetchTutorials", data);
			// res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		});
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
	const id = req.params.id;

	Tutorial.findByPk(id)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Tutorial with id=" + id,
			});
		});
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
	const id = req.params.id;

	Tutorial.update(req.body, {
		where: { id: id },
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Tutorial was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Tutorial with id=" + id,
			});
		});
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Tutorial.destroy({
		where: { id: id },
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Tutorial was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Tutorial with id=" + id,
			});
		});
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
	Tutorial.destroy({
		where: {},
		truncate: false,
	})
		.then(nums => {
			res.send({ message: `${nums} Tutorials were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all tutorials.",
			});
		});
};
