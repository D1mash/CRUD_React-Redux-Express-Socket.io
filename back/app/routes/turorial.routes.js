const tutorials = require("../controllers/tutorial.controller.js");
var router = require("express").Router();

module.exports = (app, io) => {
	io.on("connection", socket => {
		console.log(`User connected: ${socket.id}`);

		// socket.on("fetchTutorials", () => tutorials.findAll(socket));
		// socket.on("createTutorial", data => tutorials.create(socket, data));
	});

	// Create a new Tutorial
	router.post("/", tutorials.create);
	// Retrieve all Tutorials
	router.get("/", tutorials.findAll);
	// Retrieve a single Tutorial with id
	router.get("/:id", tutorials.findOne);
	// Update a Tutorial with id
	router.put("/:id", tutorials.update);
	// Delete a Tutorial with id
	router.delete("/:id", tutorials.delete);
	// Create a new Tutorial
	router.delete("/", tutorials.deleteAll);
	app.use("/api/tutorials", router);
};
