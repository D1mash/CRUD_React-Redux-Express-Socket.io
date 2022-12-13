const tutorials = require("../controllers/tutorial.controller.js");
var router = require("express").Router();

module.exports = (app, io) => {
	io.on("connection", socket => {
		console.log(`User connected: ${socket.id}`);

		socket.on("fetchTutorials", () => tutorials.findAll(io));
		socket.on("createTutorial", data => tutorials.create(io, data));
		socket.on("deleteTutorial", () => tutorials.deleteAll(io));
		socket.on("deleteTutorialById", data => tutorials.delete(io, data));
		socket.on("updateTutorial", data => tutorials.update(io, data));

		socket.on("disconnect", () => {
			console.log(socket.id, "disconnected");
		});
	});

	// Retrieve a single Tutorial with id
	router.get("/:id", tutorials.findOne);

	// Retrieve all published Tutorials
	router.get("/published", tutorials.findAllPublished);

	app.use("/api/tutorials", router);
};
